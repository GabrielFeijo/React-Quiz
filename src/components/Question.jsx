import React, { useContext, useEffect, useState } from 'react'
import { QuizContext } from '../context/quiz'
import Option from './Option'
import './Question.css'

const Question = () => {
    const [quizState, dispatch] = useContext(QuizContext)
    const currentQuestion = quizState.questions[quizState.currentQuestion]
    const options = currentQuestion.options

    useEffect(() => {
        dispatch({ type: "REORDER_QUESTIONS" })
    }, [])


    const selectOption = (option) => {
        dispatch({ type: "CHECK_ANSWER", payload: { answer: currentQuestion.answer, score: currentQuestion.score, option } })
    }


    return (
        <div className='question'>
            <p>Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}</p>
            <h2>{currentQuestion.question}</h2>
            <p className='score'>
                Acerto: {currentQuestion.score} pontos <br />
                Se utilizar a dica será retirado 1 ponto
            </p>
            <div className="options-container">
                {options.map((option) => (
                    <Option
                        option={option}
                        key={option}
                        answer={currentQuestion.answer}
                        onSelectOption={() => selectOption(option)}
                    />
                ))}
            </div>

            {!quizState.answerSelected && !quizState.showTip && <p>Sua pontuação: {quizState.score} pontos</p>}
            {quizState.answerSelected ? (
                <button onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>Continuar</button>
            ) : quizState.showTip ?
                <p className='tip'>{currentQuestion.tip}</p> :
                <div className='flex'>
                    <button onClick={() => dispatch({ type: "NEW_GAME" })} className="new-game">Reiniciar</button><button onClick={() => dispatch({ type: "SHOW_TIP" })}>Mostrar dica</button>
                </div>
            }
        </div>
    )
}

export default Question