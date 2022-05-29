import React, { useState } from "react"

const NewQuestionForm = (props) => {
  const { postTopic } = props
  const defaultState = { topic: "" }
  const [voteTopic, setVoteTopic] = useState(defaultState)
  const { shouldRedirect } = props
  
  const handleInputChange = event => {
    setVoteTopic({
      ...voteTopic,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleOnSubmit = event => {
    event.preventDefault()
    postTopic(voteTopic)
    clearField()
  }

  const clearField = event => {
    setVoteTopic(defaultState)
  } 

  return (
    <div className="largeContainer">
      <div className="centerHeaders">
        <h1 className="header">Create your topic below!</h1>
      </div>
      <div className="formContainer">
        <form onSubmit={handleOnSubmit}>
          <label htmlFor="topic" className="header callout">Create a topic!
            <input
              id="topic"
              type="text"
              className=""
              name="topic"
              placeholder="Write a topic!"
              value={voteTopic.topic}
              onChange={handleInputChange}
              />
          </label>
            <button 
              type="submit" 
              id="send-button" 
              className="cell callout secondary small-1">Save Topic
            </button>
        </form>
      </div>
    </div>
  )
}

export default NewQuestionForm