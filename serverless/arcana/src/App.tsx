import { useEffect, useState } from 'react';
import './styles/arcana.css';
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
import { ArcanaStart } from './components/ArcanaStart';
import { ArcanaIntake } from './components/ArcanaIntake';
import { ArcanaTest } from './components/ArcanaTest';
import { ArcanaResultLoading } from './components/ArcanaResultLoading';
import { ArcanaReport } from './components/ArcanaReport';

type Screen = 'start' | 'intake' | 'test' | 'loading' | 'report';

function App() {
  const [screen, setScreen] = useState<Screen>('start');
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
      setScreen('report');
    }
  }, []);

  const hasInProgress = Object.keys(answers).length > 0;
  const hasResult = report !== null;

  function handleStart() {
    const previousProfile = profile;
    clearArcanaStorage();
    setAnswers({});
    setCurrentIndex(0);
    setReport(null);
    // De naam blijft staan bij opnieuw beginnen; alleen de antwoorden gaan weg.
    setProfile(previousProfile);
    setScreen('intake');
  }

  function handleIntakeConfirm(confirmed: ArcanaProfile) {
    setProfile(confirmed);
    saveProfile(confirmed);
    saveStartedAt(new Date().toISOString());
    setScreen('test');
  }

  function handleResume() {
    setScreen('test');
  }

  function handleViewResult() {
    if (report) setScreen('report');
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
    setScreen('start');
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
    setScreen('start');
  }

  /** Wist alles, inclusief de naam: dit is de expliciete privacy-actie. */
  function handleClearAnswers() {
    clearArcanaStorage();
    setAnswers({});
    setCurrentIndex(0);
    setReport(null);
    setProfile({ ...DEFAULT_PROFILE });
    setScreen('start');
  }

  if (screen === 'intake') {
    return (
      <ArcanaIntake
        initialProfile={profile}
        onConfirm={handleIntakeConfirm}
        onBack={() => setScreen('start')}
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
    return <ArcanaReport report={report} onRestart={handleRestart} onClearAnswers={handleClearAnswers} />;
  }

  return (
    <ArcanaStart
      hasInProgress={hasInProgress}
      hasResult={hasResult}
      onStart={handleStart}
      onResume={handleResume}
      onViewResult={handleViewResult}
    />
  );
}

export default App;
