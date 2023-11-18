import { useSelector } from "react-redux";

export const QuizHeader = () => {
  const quiz = useSelector((state) => state.quiz);

  if (quiz.quizOver) {
    return;
  }

  return (
    <div className="header-wrapper">
      <span>Question</span>
      <span className="header-question-count">
        {quiz.currentQuestionIndex + 1} / {quiz.questions.length}
      </span>
    </div>
  );
};
