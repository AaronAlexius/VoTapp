import React, { useState } from "react";
import NewTopicForm from "../elements/NewTopicForm.js";
import ErrorList from "../layout/ErrorList.js";
import translateServerErrors from "../../services/translateServerErrors.js";
import { Redirect, Link } from "react-router-dom";

const GenerateTopic = props => {
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
      const roomId = body.topic.id
      setNewRoomId(roomId)
      setShouldRedirect(true)
      }
    } catch (error) {
      console.error(`Error in fetch:${error.message}`)
    }
  }

  const handleRedirect = () => {
    if (shouldRedirect) {
      return <Redirect to="/home" />
    }
  }
  
  return (
    <div className="grid-container">
      <ErrorList errors={errors} />
      <NewTopicForm postTopic={postTopic} shouldRedirect={shouldRedirect}/>
      <div className="text-center">
        {shouldRedirect ? (<>
          <Link className="cell shrink small-6 callout primary" to={`/topics/${newRoomId}`} >
            Check out your new room.  
          </Link>
          </>) 
        : (<h4>Add a new topic to head to your new room!</h4>)}
      </div>
    </div>
  )
}

export default GenerateTopic