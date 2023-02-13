import { useContext, useEffect } from 'react'
import Category from '../components/Category'
import GameOver from '../components/GameOver'
import Loading from '../components/Loading'
import Question from '../components/Question'
import Ranking from '../components/Ranking'
import Welcome from '../components/Welcome'
import { QuizContext } from '../context/quiz'
import './App.css'

function App() {
  const [quizState,dispatch] = useContext(QuizContext)

  return (
    <div className="App">
      <h1>Quiz de Programação</h1>
      {quizState.gameStage === "Loading" && <Loading/>}
      {quizState.gameStage === "Start" && <Welcome/>}
      {quizState.gameStage === "Choose" && <Category/>}
      {quizState.gameStage === "Playing" && <Question/>}
      {quizState.gameStage === "End" && <GameOver/>}
      {quizState.gameStage === "Ranking" && <Ranking/>}
   
    
    </div>
  )
}

export default App
