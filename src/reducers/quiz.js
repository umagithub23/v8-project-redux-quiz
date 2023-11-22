import { createSlice } from "@reduxjs/toolkit";


const questions = [
  {
    id: 1,
    questionText: "Which is the local currency in Sweden?",
    options: [
      "Euro (EUR)",
      "Scandinavian Pound (SCP)",
      "Swedish Crowns (SEK)",
      "Swish (SWI)",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 2,
    questionText: "Who is skogens konung (king of the woods)?",
    options: ["Troll", "Moose", "Ernst Kirchsteiger", "Cat"],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    questionText: "What is the title of the Swedish national anthem?",
    options: [
      "Du unga, du vackra",
      "Du fula, du fulla",
      "Du ramlar, du fisar",
      "Du gamla, du fria",
    ],
    correctAnswerIndex: 3,
  },
  {
    id: 4,
    questionText: "What is Kebnekaise?",
    options: [
      "Troll",
      "Swedish national dish",
      "Sweden’s highest mountain",
      "A popular pizza in Sweden",
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 5,
    questionText: "What do Swedes do when they meet for a fika?",
    options: [
      "Getting drunk",
      "Handicrafts",
      "Touch each other in a sensual way",
      "Having a coffee and maybe some pastry",
    ],
    correctAnswerIndex: 3,
  },
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });
    },

  
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    restart: () => {
      return initialState;
    },
  },
});
