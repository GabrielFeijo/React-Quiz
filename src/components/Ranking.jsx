import React, { useContext, useEffect, useState } from 'react';
import scoreFetch from '../axios/config';
import { QuizContext } from '../context/quiz';
import Card from './Card';
import './Ranking.css';

const Ranking = () => {
	const [quizState, dispatch] = useContext(QuizContext);
	const [scores, setScores] = useState([]);

	const getScores = async () => {
		try {
			const response = await scoreFetch.get('/api/score');
			setScores(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getScores();
	}, []);

	return (
		<>
			<div className='container-ranking'>
				<h2>Ranking Geral</h2>

				{scores.length > 0 ? (
					scores.map((score, index) => (
						<Card
							name={score.name}
							category={score.category}
							correctAnswers={score.correctAnswers}
							score={score.score}
							key={score._id}
							number={index + 1}
						/>
					))
				) : (
					<p>Nenhuma pontuação encontrada!</p>
				)}
			</div>
			<button
				onClick={() => dispatch({ type: 'NEW_GAME' })}
				className='btn-ranking'
			>
				Voltar
			</button>
		</>
	);
};

export default Ranking;
