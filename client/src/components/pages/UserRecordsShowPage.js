import React, { useState, useEffect } from "react";
import QuestionTile from "../elements/QuestionTile.js";

const UserRecordsShowPage = (props) => {
  const defaultState = { topic: "" }
  const [questions, setQuestions] = useState(defaultState)
  debugger
  // const userId = props.match.params.id
  // const userId = props.currentUser
  
  const getQuestions = async () => {
    try {
      const response = await fetch(`/api/v1/users/3`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      debugger
      setQuestions(body.user.question)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    getQuestions()
  }, [])

  // const questionTiles = questions.map(question => {
  //   return (
  //     <QuestionTile  
  //       key={question.id}
  //       topic={question.topic}
  //     />
  //   )
  // }) 

  return (
    <div>
      <h1>test</h1>
      {/* <h1>{currentUser.userName} here are you passed questions!</h1>
      <div>{questionTiles}</div> */}
    </div>
  )
}

export default UserRecordsShowPage