import { useSelector } from "react-redux";

export const QuizHeader = () => {
  const quiz = useSelector((state) => state.quiz);

  if (quiz.quizOver) {
    return;
  }

  const totalQuestions = quiz.questions.length;
  const answeredQuestions = quiz.currentQuestionIndex + 1;
  const progressBarWidth = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="header-wrapper">
      <span>Question</span>
      <span className="header-question-count">
        {answeredQuestions} / {totalQuestions}
      </span>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressBarWidth}%` }}
        ></div>
      </div>
    </div>
  );
};
