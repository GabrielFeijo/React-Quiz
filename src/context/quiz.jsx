import { createContext, useReducer } from 'react';
import scoreFetch from '../axios/config';

const STAGES = ['Loading', 'Start', 'Choose', 'Playing', 'End', 'Ranking'];

const initialState = {
	gameStage: STAGES[0],
	name: '',
	email: '',
	category: '',
	questions: false,
	currentQuestion: 0,
	score: 0,
	correctAnswers: 0,
	answerSelected: false,
	showTip: false,
};

const quizReducer = (state, action) => {
	switch (action.type) {
		case 'LOAD_QUESTIONS':
			return {
				...state,
				gameStage: STAGES[1],
			};
		case 'CHANGE_STATE':
			return {
				...state,
				gameStage: STAGES[2],
			};
		case 'START_GAME':
			const category = action.payload.category;
			const name = action.payload.name;
			const email = action.payload.email;
			const questions = action.payload.questions;

			return {
				...state,
				questions: questions.questions,
				name: name,
				email: email,
				category: category,
				gameStage: STAGES[3],
			};

		case 'REORDER_QUESTIONS':
			const reorderQuestions = state.questions.sort(() => {
				return Math.random() - 0.5;
			});
			return {
				...state,
				questions: reorderQuestions,
			};
		case 'CHANGE_QUESTION':
			const nextQuestion = state.currentQuestion + 1;
			let endGame = false;

			if (!state.questions[nextQuestion]) {
				scoreFetch
					.post('/api/score', {
						name: state.name,
						email: state.email,
						category: state.category,
						correctAnswers: state.correctAnswers,
						score: state.score,
					})
					.then(
						(response) => {
							console.log(response);
						},
						(error) => {
							console.log(error);
						}
					);

				endGame = true;
			}
			return {
				...state,
				currentQuestion: nextQuestion,
				gameStage: endGame ? STAGES[4] : state.gameStage,
				answerSelected: false,
				showTip: false,
			};
		case 'NEW_GAME':
			return initialState;
		case 'RANKING':
			return {
				...initialState,
				gameStage: STAGES[5],
			};
		case 'CHECK_ANSWER':
			if (state.answerSelected) return state;
			const answer = action.payload.answer;
			const option = action.payload.option;
			const points = action.payload.score;
			let correctAnswer = 0;
			let correct = 0;
			if (answer === option) {
				if (state.showTip) {
					correctAnswer = points - 1;
				} else {
					correctAnswer = points;
				}
				correct = 1;
			}
			return {
				...state,
				score: state.score + correctAnswer,
				correctAnswers: state.correctAnswers + correct,
				answerSelected: option,
			};

		case 'SHOW_TIP':
			if (state.showTip) return state;
			return {
				...state,
				showTip: true,
			};

		default:
			return state;
	}
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
	const value = useReducer(quizReducer, initialState);
	return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
