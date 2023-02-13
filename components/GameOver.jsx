import React, { useContext } from 'react'
import { QuizContext } from '../context/quiz'
import WellDone from '../img/welldone.svg'

import "./GameOver.css"

const GameOver = () => {

  const [quizState, dispatch] = useContext(QuizContext);
  return (
    <div className='gameover'>
      <h2>Fim de jogo</h2>
      <p>Pontuação: {quizState.score} pontos</p>
      <p>Você acertou {quizState.correctAnswers} de {quizState.questions.length} perguntas.</p>
      <img src={WellDone} alt="Fim do Quiz" />
      <button onClick={() => dispatch({ type: "NEW_GAME" })}>Reiniciar</button>
      <button onClick={() => dispatch({ type: "RANKING" })} className='btn-ranking'>Ranking</button>

    </div>
  )
}

export default GameOver