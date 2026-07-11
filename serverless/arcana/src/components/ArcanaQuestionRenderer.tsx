import type { ArcanaAnswer, ArcanaQuestion } from '../types/arcana';
import { ArcanaLikertQuestion } from './ArcanaLikertQuestion';
import { ArcanaForcedChoiceQuestion } from './ArcanaForcedChoiceQuestion';
import { ArcanaScenarioQuestion } from './ArcanaScenarioQuestion';
import { ArcanaRankingQuestion } from './ArcanaRankingQuestion';

interface Props {
  question: ArcanaQuestion;
  answer: ArcanaAnswer | undefined;
  onAnswer: (answer: ArcanaAnswer) => void;
}

export function ArcanaQuestionRenderer({ question, answer, onAnswer }: Props) {
  switch (question.type) {
    case 'likert':
      return (
        <ArcanaLikertQuestion
          question={question}
          answer={answer?.type === 'likert' ? answer : undefined}
          onAnswer={onAnswer}
        />
      );
    case 'forcedChoice':
      return (
        <ArcanaForcedChoiceQuestion
          question={question}
          answer={answer?.type === 'forcedChoice' ? answer : undefined}
          onAnswer={onAnswer}
        />
      );
    case 'scenario':
      return (
        <ArcanaScenarioQuestion
          question={question}
          answer={answer?.type === 'scenario' ? answer : undefined}
          onAnswer={onAnswer}
        />
      );
    case 'ranking':
      return (
        <ArcanaRankingQuestion
          question={question}
          answer={answer?.type === 'ranking' ? answer : undefined}
          onAnswer={onAnswer}
        />
      );
    default:
      return null;
  }
}
