import React, { useState, useEffect } from "react";
import QuestionTile from "../elements/QuestionTile.js";

const UserRecordsShowPage = (props) => {
  const defaultState = {}
  const [questions, setQuestions] = useState({})
  // const userId = props.match.params.id
  // const userId = props.currentUser
  
  const getQuestions = async () => {
    try {
      const userId = 3
      const response = await fetch(`/api/v1/users/${userId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      console.log(body)
      const bodyQuestions = body.user.questions
      debugger
      setQuestions(bodyQuestions)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    getQuestions()
  }, [])
// debugger
  const questionTiles = questions.map(question => {
    debugger
    return (
      <QuestionTile  
        key={question.id}
        topic={question.topic}
      />
    )
  }) 

  return (
    <div>
      <h1>test</h1>
      {/* <h1>{currentUser.userName} here are you old questions!</h1> */}
      {/* <div>{questionTiles}</div> */}
    </div>
  )
}

export default UserRecordsShowPage