import React from 'react'
import './Card.css'

const Card = ({ name, category, correctAnswers, score, number }) => {
  return (
    <div className='card'>
      <div>
        <h3>{number}º {name}</h3>
        <p>{category}</p>
      </div>
      <div className='box'>
        <p>Acertos: {correctAnswers}</p>
        <p>Pontuação: {score}</p>
      </div>
    </div>
  )
}

export default Card

