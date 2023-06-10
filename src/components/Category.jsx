import React, { useContext, useState } from 'react';
import scoreFetch from '../axios/config';
import { QuizContext } from '../context/quiz';
import './Category.css';
import './Loading.css';

const Category = () => {
	const [quizState, dispatch] = useContext(QuizContext);
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const redirect = async (category) => {
		if (name != '' && email != '') {
			setLoading(true);
			try {
				const response = await scoreFetch.get(`/api/question/${category}`);
				dispatch({
					type: 'START_GAME',
					payload: {
						category: category,
						name: name,
						email: email,
						questions: response.data,
					},
				});
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		} else {
			alert('Preencha todas informações!');
		}
	};
	return (
		<>
			{!loading ? (
				<div className='category'>
					<h2>Preencha as informações e escolha uma categoria</h2>
					<label htmlFor='name'>Infome seu nome:</label>
					<input
						type='text'
						placeholder='Insira seu nome'
						id='name'
						onChange={(event) => setName(event.target.value)}
						value={name}
					/>
					<label htmlFor='email'>Infome seu email:</label>
					<input
						type='email'
						placeholder='Insira seu email'
						id='email'
						onChange={(event) => setEmail(event.target.value)}
						value={email}
					/>
					<div className='flex'>
						<button onClick={() => redirect('HTML')}>HTML</button>
						<button onClick={() => redirect('CSS')}>CSS</button>
						<button onClick={() => redirect('JavaScript')}>JavaScript</button>
					</div>
				</div>
			) : (
				<div>
					<div className='loader'></div>
					<h2>Carregando ...</h2>
				</div>
			)}
		</>
	);
};

export default Category;
