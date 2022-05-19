import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const RoomShowPage = (props) => {
  const defaultState = { text: "" }
  const [discussion, setDiscussion] = useState([])
  const [message, setMessage] = useState(defaultState)
  const [socket] = useState(io("http://localhost:3000"))

  

  useEffect(() => {
    socket.on("receive-message", (message)=> {
      setDiscussion((previousMessages) => [...previousMessages, message])
    })
  }, [])

  const handleInputChange = event => {
    setMessage({
      ...message,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }
  const handleOnSubmit = event => {
    event.preventDefault()
    socket.emit("send-message", message )
    setDiscussion(discussion.concat(message))
    clearField()
  }

  const clearField = event => {
    setMessage(defaultState)
  }

  const discussionListItems = discussion.map(messageObject => {
    return (
      <div>
        <p>{messageObject.text}</p>
      </div>
    )
  })

  return(
    <div className="chatContainer">
        <div id="message-container" className="messageContainer">{discussionListItems}</div>
        <div id="form-container" className="formContainer">
          <form id="form" onSubmit={handleOnSubmit} className="grid-x grid-margin-x">
            <label htmlFor="message-input" className="cell small-2">Message</label>
            <input 
              type="text" 
              id="message-input" 
              className="cell small-8"
              name="text"
              onChange={handleInputChange}
              value={message.text}
              ></input>
            <button 
              type="submit" 
              id="send-button" 
              className="cell small-2">Send</button>
          </form>
      </div>
    </div>
  )
}

export default RoomShowPage;