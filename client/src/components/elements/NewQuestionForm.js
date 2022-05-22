import React, { useState } from "react"

const NewQuestionForm = (props) => {
  const { postTopic } = props
  const defaultState = { image: "", topic: "", boxes: 1, }
  const [voteTopic, setVoteTopic] = useState(defaultState)
  
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
    <div className="chatContainer">
      <h1 className="header">Create your query below!</h1>
      <div className="formContainer">
        <form onSubmit={handleOnSubmit}>
          <label 
            htmlFor="mapOfImages"
            className="mapOfImages"
            name="image">Choose your image!</label>
          <label htmlFor="topic">Create a topic!
            <input
              id="topic"
              type="text"
              className=""
              name="topic"
              value={voteTopic.topic}
              onChange={handleInputChange}
              />
          </label>
          <label htmlFor="boxes">Select the number of text boxes needed!
            <select 
              id="boxes"
              type="number"
              name="boxes"
              value={voteTopic.boxes}
              onChange={handleInputChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
          </label>
          <button 
          type="submit" 
          id="send-button" 
          className="cell small-2">Save Topic
      </button>
        </form>
      </div>
    </div>
  )
}

export default NewQuestionForm