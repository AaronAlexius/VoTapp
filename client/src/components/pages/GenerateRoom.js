import React, { useState } from "react";
import NewQuestionForm from "../elements/NewQuestionForm.js";
import ErrorList from "../layout/ErrorList.js";
import translateServerErrors from "../../services/translateServerErrors.js";

const GenerateRoom = props => {
  const [errors, setErrors] = useState([])

  const postTopic = async (newTopicData) => {
    try {
      const response = await fetch(`/api/v1/rooms/new`, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(newTopicData)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      }   
    } catch (error) {
      console.error(`Error in fetch:${error.message}`)
    }
  }

  return (
    <div>
      <ErrorList errors={errors} />
      <NewQuestionForm postTopic={postTopic} />
    </div>
  )
}

export default GenerateRoom