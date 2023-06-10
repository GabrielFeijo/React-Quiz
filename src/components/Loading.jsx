import React, { useContext, useEffect } from 'react'
import scoreFetch from '../axios/config'
import { QuizContext } from '../context/quiz'
import './Loading.css'

const Loading = () => {
    const [quizState, dispatch] = useContext(QuizContext)

    const getQuestions = async () => {
        try {
            const response = await scoreFetch.get('/')
            console.log(response)
            dispatch({ type: "LOAD_QUESTIONS" })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getQuestions()
    }, [])
    return (
        <>
            <div className="loader"></div>
            <h2>Carregando aguarde ...</h2>
        </>
    )
}

export default Loading