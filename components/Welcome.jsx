import React, { useContext } from 'react'
import './Welcome.css'
import { QuizContext } from '../context/quiz'

const Welcome = () => {

  const [quizState, dispatch] = useContext(QuizContext)

  return (
    <div className='welcome'>
      <h2>Seja bem-vindo</h2>
      <p>Escolha uma das opções abaixo:</p>
      <div className="flex">
        <button onClick={() => dispatch({ type: "RANKING" })} className='ranking'>Ver Ranking</button>
        <button onClick={() => dispatch({ type: "CHANGE_STATE" })}>Iniciar</button>
      </div>
    </div>
  )
}

export default Welcome