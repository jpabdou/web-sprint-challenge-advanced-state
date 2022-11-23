import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
// import * as actionCreators from '../state/action-creators'
import { inputChange, postQuiz,resetForm } from '../state/action-creators'


export function Form(props) {
  const [disabled,setDisabled]=useState(true)

  useEffect(()=>{
    const isFilled = (currentValue) => currentValue.trim().length > 0;
    const formVal = Object.values(props.form).every(isFilled)

    if (formVal) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  },[props.form])

  const onChange = evt => {
    props.inputChange(evt.target.id, evt.target.value)

  }

  const onSubmit = evt => {
    evt.preventDefault()
    props.postQuiz({"question_text":props.form.newQuestion, "true_answer_text": props.form.newTrueAnswer, "false_answer_text": props.form.newFalseAnswer}, `Congrats: "${props.form.newQuestion}" is a great question!`)

  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" value={props.form.newQuestion} placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" value={props.form.newTrueAnswer} placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" value={props.form.newFalseAnswer} placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={disabled} onClick={onSubmit}>Submit new quiz</button>
    </form>
  )
}

const mapStateToProps = state => {
  return({form: state.form})
}

export default connect(mapStateToProps, {inputChange, resetForm,postQuiz})(Form)
