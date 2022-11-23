import React, {useEffect , useState} from 'react'
import { connect } from 'react-redux'
import { fetchQuiz, selectAnswer, postAnswer } from '../state/action-creators'

function Quiz(props) {
  const [disabled,setDisabled] = useState(true)
  useEffect(()=>{
    if (props.selectedAnswer) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  },[props.selectedAnswer])

  useEffect(()=>props.fetchQuiz(),[props.message])
  // console.log(props)
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              {props.quiz.answers.map(answer=>{
                return (<div className={props.selectedAnswer === answer.answer_id ? "answer selected": "answer"} key={answer.answer_id}>
                {answer.text}
                <button onClick={()=>props.selectAnswer(answer.answer_id)}>
                  {props.selectedAnswer === answer.answer_id ? "SELECTED" : "Select"}
                </button>
              </div>)
              })}
            </div>

            <button disabled={disabled} onClick={()=>props.postAnswer({"quiz_id": props.quiz.quiz_id, "answer_id": props.selectedAnswer})} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : <h2>{ 'Loading next quiz...' }</h2>
      }
    </div>
  )
}
const mapStateToProps =state =>{
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer,
    message: state.infoMessage
  }
}

export default connect(mapStateToProps,{fetchQuiz, selectAnswer, postAnswer})(Quiz)
