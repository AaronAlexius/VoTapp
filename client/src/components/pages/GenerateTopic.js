import React, { useState } from "react";
import NewTopicForm from "../elements/NewTopicForm.js";
import ErrorList from "../layout/ErrorList.js";
import translateServerErrors from "../../services/translateServerErrors.js";
import { Link } from "react-router-dom";

const GenerateTopic = props => {
  const [errors, setErrors] = useState([])
  const [topicVerified, setTopicVerified] = useState(false)
  const [roomSaved, setRoomSaved] = useState(false)
  const [newTopic, setNewTopic] = useState({})
  const [newRoom, setNewRoom] = useState({
    id: "",
    userId: "", 
    topicId: ""
  })
  const id = props.user.id

  const postTopic = async (newTopicData) => {
    try {
      const response = await fetch(`/api/v1/topics/new`, {
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
      const topic = body.topic
      setNewTopic(topic)
      setTopicVerified(true)
      }
    } catch (error) {
      console.error(`Error in fetch:${error.message}`)
    }
  }

  const postRoom = async () => {
    const roomObject = {
      topicId: newTopic.id,
      userId: id
    }
    try {
      const response = await fetch("/api/v1/rooms/new", {
        method: 'POST', 
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(roomObject)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      } else {
        const body = await response.json()
        const room = body.room
        setNewRoom(room)
        setRoomSaved(true)
      }

    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const bottomButton = () => {
    if (!topicVerified && !roomSaved) {
      return <h4>Create a new topic to discuss!</h4>
    } else if (topicVerified && !roomSaved) {
      return (
        <button type="button" className="button primary" onClick={postRoom}>
          Save your room?
        </button>
      )
    } else if (topicVerified && roomSaved) {
      return (
        <Link type="Link" className="button secondary" to={`/topics/${newRoom.topicId}`}>
          Let's head to your new room!
        </Link>
      )
    } 
  }
  
  return (
    <div className="grid-container">
      <ErrorList errors={errors} />
      <NewTopicForm postTopic={postTopic} topicVerified={topicVerified}/>
      <div className="text-center">
        {bottomButton()}
      </div>
    </div>
  )
}

export default GenerateTopic