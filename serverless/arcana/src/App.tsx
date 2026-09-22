import { Suspense, lazy, useEffect, useRef, useState } from 'react';
// tokens.css eerst: die levert de kleuren (licht én donker) en de oude
// tokennamen als alias, waar de twee andere bestanden op rekenen.
import './styles/tokens.css';
import './styles/arcana.css';
import './styles/site.css';
import { QUESTION_COUNT } from './data/arcanaQuestionCount';
import {
  DEFAULT_PROFILE,
  clearArcanaStorage,
  loadAnswers,
  loadCurrentQuestionIndex,
  loadProfile,
  loadResult,
  saveAnswers,
  saveCompletedAt,
  saveCurrentQuestionIndex,
  saveProfile,
  saveResult,
  saveStartedAt,
} from './lib/arcanaStorage';
import type {
  ArcanaAnswer,
  ArcanaAnswerMap,
  ArcanaProfile,
  ArcanaReport as ReportType,
} from './types/arcana';
import { ArcanaEngineUnavailable } from './components/ArcanaEngineUnavailable';
import { ArcanaResultLoading } from './components/ArcanaResultLoading';
import { LandingPage } from './site/LandingPage';
import { SiteHeader } from './site/SiteHeader';
import { SiteFooter } from './site/SiteFooter';
import { PrivacyPage, TermsPage } from './site/LegalPages';

/*
 * Drie laadpunten. Wat een landingsbezoeker niet nodig heeft, komt niet mee:
 * de vragenbank en de vraagschermen laden bij "Start de test", de rekenengine
 * met alle rapportteksten wordt vóórgeladen zodra de intake begint (zodat hij
 * ruim binnen is vóór vraag 120, ook op een trage verbinding), en de
 * rapportweergave laadt bij het openen van het rapport.
 */
const ArcanaIntake = lazy(() => import('./components/ArcanaIntake').then((m) => ({ default: m.ArcanaIntake })));
const ArcanaTest = lazy(() => import('./components/ArcanaTest').then((m) => ({ default: m.ArcanaTest })));
const ArcanaReport = lazy(() => import('./components/ArcanaReport').then((m) => ({ default: m.ArcanaReport })));

interface Engine {
  calculateArcanaResult: typeof import('./lib/arcanaScoringEngine').calculateArcanaResult;
  generateArcanaReport: typeof import('./lib/arcanaReportGenerator').generateArcanaReport;
}

let enginePromise: Promise<Engine> | null = null;

/**
 * Laadt de engine-chunk, met drie pogingen en oplopende wachttijd. Faalt hij
 * alsnog, dan gooit hij — en dat is het moment waarop het scherm hieronder de
 * antwoorden veiligstelt in plaats van een lege pagina te tonen.
 */
function loadEngine(): Promise<Engine> {
  if (!enginePromise) {
    enginePromise = (async () => {
      let laatste: unknown;
      for (let poging = 0; poging < 3; poging += 1) {
        try {
          const [scoring, generator] = await Promise.all([
            import('./lib/arcanaScoringEngine'),
            import('./lib/arcanaReportGenerator'),
          ]);
          return {
            calculateArcanaResult: scoring.calculateArcanaResult,
            generateArcanaReport: generator.generateArcanaReport,
          };
        } catch (error) {
          laatste = error;
          await new Promise((r) => setTimeout(r, 400 * 2 ** poging));
        }
      }
      // Een mislukte poging mag een latere poging niet blokkeren.
      enginePromise = null;
      throw laatste instanceof Error ? laatste : new Error('Rekenmodule niet beschikbaar');
    })();
  }
  return enginePromise;
}

function preloadEngine() {
  loadEngine().catch(() => {
    // Alleen voorladen; een fout hier wordt bij het echte gebruik opnieuw geprobeerd.
  });
}

type Screen = 'landing' | 'intake' | 'test' | 'loading' | 'engine-unavailable' | 'report';
type LegalRoute = 'privacy' | 'voorwaarden';

/**
 * De losse pagina's hangen aan een hash zodat ze deelbaar en herlaadbaar zijn
 * zonder dat de webserver rewrite-regels nodig heeft. Dat is bewust: de site
 * wordt als statische map geüpload, en een pad als /privacy zou daar een 404
 * geven tenzij de host apart geconfigureerd wordt.
 */
const LEGAL_HASHES: Record<string, LegalRoute> = {
  '#/privacy': 'privacy',
  '#/voorwaarden': 'voorwaarden',
};

function readLegalRoute(): LegalRoute | null {
  return LEGAL_HASHES[window.location.hash] ?? null;
}

/** Rustige tussenstand terwijl een chunk binnenkomt; geen tekstwand, geen spinner-theater. */
function ScreenFallback() {
  return <div className="arcana-screen arcana-screen--fallback" aria-busy="true" />;
}

function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [legalRoute, setLegalRoute] = useState<LegalRoute | null>(() =>
    typeof window === 'undefined' ? null : readLegalRoute(),
  );
  const [answers, setAnswers] = useState<ArcanaAnswerMap>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [report, setReport] = useState<ReportType | null>(null);
  const [profile, setProfile] = useState<ArcanaProfile>({ ...DEFAULT_PROFILE });
  // Het laadscherm meldt zich klaar op een vaste tijd; het rekenen zelf wacht
  // op de engine. Beide moeten er zijn vóór het rapport verschijnt.
  const loadingDoneRef = useRef(false);

  useEffect(() => {
    const storedAnswers = loadAnswers();
    const storedResult = loadResult();
    setAnswers(storedAnswers);
    setProfile(loadProfile());
    setCurrentIndex(Math.min(loadCurrentQuestionIndex(), QUESTION_COUNT - 1));
    if (storedResult) {
      setReport(storedResult);
    }
  }, []);

  useEffect(() => {
    const onHash = () => setLegalRoute(readLegalRoute());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Bij het wisselen van scherm bovenaan beginnen; anders land je halverwege de
  // vorige pagina in de nieuwe.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen, legalRoute]);

  const hasInProgress = Object.keys(answers).length > 0 && report === null;
  const hasResult = report !== null;
  const resumeQuestionNumber = Math.min(currentIndex + 1, QUESTION_COUNT);

  function goToSite() {
    if (window.location.hash) window.location.hash = '';
    setLegalRoute(null);
  }

  function handleStart() {
    const previousProfile = profile;
    clearArcanaStorage();
    setAnswers({});
    setCurrentIndex(0);
    setReport(null);
    // De naam blijft staan bij opnieuw beginnen; alleen de antwoorden gaan weg.
    setProfile(previousProfile);
    goToSite();
    preloadEngine();
    setScreen('intake');
  }

  function handleIntakeConfirm(confirmed: ArcanaProfile) {
    setProfile(confirmed);
    saveProfile(confirmed);
    saveStartedAt(new Date().toISOString());
    setScreen('test');
  }

  function handleResume() {
    goToSite();
    preloadEngine();
    setScreen('test');
  }

  function handleViewResult() {
    if (report) {
      goToSite();
      setScreen('report');
    }
  }

  function handleAnswer(answer: ArcanaAnswer) {
    setAnswers((prev) => {
      const next = { ...prev, [answer.questionId]: answer };
      saveAnswers(next);
      return next;
    });
  }

  function handleNext() {
    const isLast = currentIndex === QUESTION_COUNT - 1;
    if (isLast) {
      saveCompletedAt(new Date().toISOString());
      loadingDoneRef.current = false;
      setScreen('loading');
      return;
    }
    const next = currentIndex + 1;
    setCurrentIndex(next);
    saveCurrentQuestionIndex(next);
  }

  function handlePrevious() {
    const prev = Math.max(0, currentIndex - 1);
    setCurrentIndex(prev);
    saveCurrentQuestionIndex(prev);
  }

  function handlePause() {
    setScreen('landing');
  }

  async function generateReport() {
    try {
      const engine = await loadEngine();
      const result = engine.calculateArcanaResult(answers);
      const generated = engine.generateArcanaReport(result, profile, new Date().toISOString());
      saveResult(generated);
      setReport(generated);
      setScreen('report');
    } catch {
      setScreen('engine-unavailable');
    }
  }

  function handleLoadingDone() {
    if (loadingDoneRef.current) return;
    loadingDoneRef.current = true;
    void generateReport();
  }

  function handleRestart() {
    const previousProfile = profile;
    clearArcanaStorage();
    setAnswers({});
    setCurrentIndex(0);
    setReport(null);
    setProfile(previousProfile);
    setScreen('landing');
  }

  /** Wist alles, inclusief de naam: dit is de expliciete privacy-actie. */
  function handleClearAnswers() {
    clearArcanaStorage();
    setAnswers({});
    setCurrentIndex(0);
    setReport(null);
    setProfile({ ...DEFAULT_PROFILE });
    setScreen('landing');
  }

  function openLegal(route: LegalRoute) {
    window.location.hash = route === 'privacy' ? '#/privacy' : '#/voorwaarden';
    setLegalRoute(route);
  }

  // De losse pagina's staan los van de testflow: ook midden in de test kun je
  // de privacyverklaring openen zonder je voortgang kwijt te raken.
  if (legalRoute) {
    return (
      <div className="site">
        <SiteHeader onStart={handleStart} hasInProgress={hasInProgress} onResume={handleResume} />
        <main className="site__main">
          {legalRoute === 'privacy' ? <PrivacyPage onBack={goToSite} /> : <TermsPage onBack={goToSite} />}
        </main>
        <SiteFooter onNavigate={openLegal} />
      </div>
    );
  }

  if (screen === 'intake') {
    return (
      <Suspense fallback={<ScreenFallback />}>
        <ArcanaIntake
          initialProfile={profile}
          onConfirm={handleIntakeConfirm}
          onBack={() => setScreen('landing')}
        />
      </Suspense>
    );
  }

  if (screen === 'test') {
    return (
      <Suspense fallback={<ScreenFallback />}>
        <ArcanaTest
          currentIndex={currentIndex}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onPause={handlePause}
        />
      </Suspense>
    );
  }

  if (screen === 'loading') {
    return <ArcanaResultLoading onDone={handleLoadingDone} />;
  }

  if (screen === 'engine-unavailable') {
    return (
      <ArcanaEngineUnavailable
        onRetry={() => {
          setScreen('loading');
          loadingDoneRef.current = false;
        }}
        onBackToSite={() => setScreen('landing')}
      />
    );
  }

  if (screen === 'report' && report) {
    return (
      <Suspense fallback={<ScreenFallback />}>
        <ArcanaReport
          report={report}
          onRestart={handleRestart}
          onClearAnswers={handleClearAnswers}
          onBackToSite={() => setScreen('landing')}
        />
      </Suspense>
    );
  }

  return (
    <div className="site">
      <SiteHeader onStart={handleStart} hasInProgress={hasInProgress} onResume={handleResume} />
      <main className="site__main">
        <LandingPage
          onStart={handleStart}
          onResume={handleResume}
          onViewResult={handleViewResult}
          hasInProgress={hasInProgress}
          hasResult={hasResult}
          resumeQuestionNumber={resumeQuestionNumber}
        />
      </main>
      <SiteFooter onNavigate={openLegal} />
    </div>
  );
}

export default App;
