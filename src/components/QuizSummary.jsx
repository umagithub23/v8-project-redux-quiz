import { useSelector, useDispatch } from "react-redux";
import { quiz as quizSlicer } from "../reducers/quiz";

export const QuizSummary = () => {
  const quiz = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  if (!quiz.quizOver) {
    return;
  }

  const handleRestartQuizClick = () => {
    dispatch(quizSlicer.actions.restart());
  };

  return (
    <div className="summary-wrapper">
      <h2>Summary:</h2>
      <div className="summary-text">
        {quiz.answers.filter((a) => a.isCorrect).length} out of{" "}
        {quiz.questions.length} correct!
      </div>
      <table>
        <tbody>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Your answer</th>
          </tr>
          {quiz.questions.map((question, index) => {
            const answer = quiz.answers.find(
              (a) => a.questionId === question.id
            );
            return (
              <tr key={index}>
                <td>{question.questionText}</td>
                <td>{question.options[question.correctAnswerIndex]}</td>
                <td
                  style={{
                    color: answer.isCorrect ? "green" : "red",
                  }}
                >
                  {answer.answer}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleRestartQuizClick}>Restart quiz!</button>
    </div>
  );
};
