import React, { useState, useEffect } from "react";
import QuestionTile from "../elements/QuestionTile.js";
import { withRouter } from "react-router-dom";

const UserRecordsShowPage = (props) => {
  const [questions, setQuestions] = useState([])
  const userId = props.match.params.id     
  const userName = props.user.userName
  
  const getQuestions = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      const bodyQuestions = body.user.questions
      setQuestions(bodyQuestions)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    getQuestions()
  }, [])

  const questionTiles = questions.map(question => {
    return (
      <QuestionTile  
        key={question.id}
        id={question.id}
        topic={question.topic}
      />
    )
  }) 

  return (
    <div>
      <h1>{userName} here are you old questions!</h1>
      <div>{questionTiles}</div>
    </div>
  )
}

export default withRouter(UserRecordsShowPage)