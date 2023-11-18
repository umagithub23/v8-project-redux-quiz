import { CurrentQuestion } from "./CurrentQuestion";
import { QuizSummary } from "./QuizSummary";

import "./Quiz.css";
import { QuizHeader } from "./QuizHeader";

export const Quiz = () => {
  return (
    <div className="quiz-wrapper">
      <QuizHeader />
      <CurrentQuestion />
      <QuizSummary />
    </div>
  );
};
