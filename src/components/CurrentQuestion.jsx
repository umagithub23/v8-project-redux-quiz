import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { quiz as quizSlicer } from "../reducers/quiz";

export const CurrentQuestion = () => {
  const quiz = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const [localSelectedAnswerIndex, setLocalSelectedAnswerIndex] = useState();
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  if (quiz.quizOver) {
    return;
  }

  const question = quiz.questions[quiz.currentQuestionIndex];

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }

  const handleOptionChange = (index) => setLocalSelectedAnswerIndex(index);

  const handleSubmitClick = () => {
    dispatch(
      quizSlicer.actions.submitAnswer({
        questionId: question.id,
        answerIndex: localSelectedAnswerIndex,
      })
    );

    setIsAnswerSubmitted(true);
  };

  const handleNextClick = () => {
    setLocalSelectedAnswerIndex(undefined);
    setIsAnswerSubmitted(false);
    dispatch(quizSlicer.actions.goToNextQuestion());
  };

  const answer = quiz.answers.find((a) => a.questionId === question.id);
  const isLastQuestion =
    quiz.currentQuestionIndex + 1 === quiz.questions.length;

  return (
    <div className="question-wrapper">
      <div className="question">
        <h3>{question.questionText}</h3>
        <section className="question-options">
          {question.options.map((option, index) => (
            <label key={index} htmlFor={option}>
              <input
                type="radio"
                id={option}
                value={localSelectedAnswerIndex}
                checked={index === localSelectedAnswerIndex}
                onChange={() => handleOptionChange(index)}
                disabled={isAnswerSubmitted}
              />
              {option}
            </label>
          ))}
        </section>
      </div>
      <div className="answer-feedback">
        {answer && (
          <span style={{ color: answer.isCorrect ? "green" : "red" }}>
            <b>{answer.isCorrect ? "Correct" : "Wrong"}</b>
          </span>
        )}
      </div>
      <div className="question-footer">
        {!isAnswerSubmitted && (
          <button
            disabled={localSelectedAnswerIndex === undefined}
            onClick={handleSubmitClick}
          >
            Submit
          </button>
        )}
        {isAnswerSubmitted && (
          <button onClick={handleNextClick}>
            {isLastQuestion ? "Finish!" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};
