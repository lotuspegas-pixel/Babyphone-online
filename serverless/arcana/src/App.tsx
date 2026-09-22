import { useEffect, useState } from 'react';
// tokens.css eerst: die levert de kleuren (licht én donker) en de oude
// tokennamen als alias, waar de twee andere bestanden op rekenen.
import './styles/tokens.css';
import './styles/arcana.css';
import './styles/site.css';
import { ARCANA_QUESTIONS } from './data/arcanaQuestions';
import { calculateArcanaResult } from './lib/arcanaScoringEngine';
import { generateArcanaReport } from './lib/arcanaReportGenerator';
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
import { ArcanaIntake } from './components/ArcanaIntake';
import { ArcanaTest } from './components/ArcanaTest';
import { ArcanaResultLoading } from './components/ArcanaResultLoading';
import { ArcanaReport } from './components/ArcanaReport';
import { LandingPage } from './site/LandingPage';
import { SiteHeader } from './site/SiteHeader';
import { SiteFooter } from './site/SiteFooter';
import { PrivacyPage, TermsPage } from './site/LegalPages';

type Screen = 'landing' | 'intake' | 'test' | 'loading' | 'report';
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

function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [legalRoute, setLegalRoute] = useState<LegalRoute | null>(() =>
    typeof window === 'undefined' ? null : readLegalRoute(),
  );
  const [answers, setAnswers] = useState<ArcanaAnswerMap>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [report, setReport] = useState<ReportType | null>(null);
  const [profile, setProfile] = useState<ArcanaProfile>({ ...DEFAULT_PROFILE });

  useEffect(() => {
    const storedAnswers = loadAnswers();
    const storedResult = loadResult();
    setAnswers(storedAnswers);
    setProfile(loadProfile());
    setCurrentIndex(Math.min(loadCurrentQuestionIndex(), ARCANA_QUESTIONS.length - 1));
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
  const resumeQuestionNumber = Math.min(currentIndex + 1, ARCANA_QUESTIONS.length);

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
    const isLast = currentIndex === ARCANA_QUESTIONS.length - 1;
    if (isLast) {
      saveCompletedAt(new Date().toISOString());
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

  function handleLoadingDone() {
    const result = calculateArcanaResult(answers);
    const generated = generateArcanaReport(result, profile, new Date().toISOString());
    saveResult(generated);
    setReport(generated);
    setScreen('report');
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
      <ArcanaIntake
        initialProfile={profile}
        onConfirm={handleIntakeConfirm}
        onBack={() => setScreen('landing')}
      />
    );
  }

  if (screen === 'test') {
    return (
      <ArcanaTest
        currentIndex={currentIndex}
        answers={answers}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onPause={handlePause}
      />
    );
  }

  if (screen === 'loading') {
    return <ArcanaResultLoading onDone={handleLoadingDone} />;
  }

  if (screen === 'report' && report) {
    return <ArcanaReport
        report={report}
        onRestart={handleRestart}
        onClearAnswers={handleClearAnswers}
        onBackToSite={() => setScreen('landing')}
      />;
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
