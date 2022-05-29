import React, { useState } from "react";
import NewQuestionForm from "../elements/NewQuestionForm.js";
import ErrorList from "../layout/ErrorList.js";
import translateServerErrors from "../../services/translateServerErrors.js";
import { Redirect, Link } from "react-router-dom";

const GenerateRoom = props => {
  const [errors, setErrors] = useState([])
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [newRoomId, setNewRoomId] = useState()

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
      } else {
      const body = await response.json()
      const roomId = body.question.id
      setNewRoomId(roomId)
      setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch:${error.message}`)
    }
  }

  const handleRedirect = () => {
    console.log("button works")
    console.log(newRoomId)
    console.log(shouldRedirect)
    if (shouldRedirect) {
      return <Redirect to="/home" />
    }
  }
  
  return (
    <div className="grid-container">
      <ErrorList errors={errors} />
      <NewQuestionForm postTopic={postTopic} shouldRedirect={shouldRedirect}/>
      <div className="text-center">
        {shouldRedirect ? (<>
          <Link className="cell shrink small-6 callout primary" to={`/rooms/${newRoomId}`} >
            Check out your new room.  
          </Link>
          </>) 
        : (<h4>Add a new topic to head to your new room!</h4>)}
      </div>
    </div>
  )
}

export default GenerateRoom