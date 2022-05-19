import React, { useEffect, useState } from 'react';

const RoomShowPage = (props) => {
  const [message, setMessage] = useState([])

  const handleInputChange = event => {
    setMessage({
      ...message,
      [event.currentTarget.name]: event.currentTarget.value,
    })
    console.log(message)
  }
  const handleOnSubmit = event => {
    event.preventDefault()
    
  }

  const handleOnClick = event => {
    alert("works")
  }

  return(
    <div className="chatContainer">
      {/* <div className="grid-x grid-margin-x"> */}
        <div id="message-container" className="messageContainer"></div>
        <div id="form-container" className="formContainer">
          <form id="form" onSubmit={handleOnSubmit} className="grid-x grid-margin-x">
            <label htmlFor="message-input" className="cell small-2">Message</label>
            <input 
              type="text" 
              id="message-input" 
              className="cell small-8"
              name="message"
              value={message}
              onChange={handleInputChange}></input>
            <button 
              type="submit" 
              id="send-button" 
              className="cell small-2">Send</button>
            <label htmlFor="room-input" className="cell small-2">Room</label>
            <input 
              type="text" 
              id="room-input" 
              className="cell small-8"></input>
            <button 
              type="button" 
              onClick={handleOnClick} 
              id="room-button" 
              className="cell small-2">Join</button>
          </form>
        {/* </div> */}
      </div>
    </div>
  )
}

export default RoomShowPage;

// <div className="grid-container">
// {/* <div className="grid-x grid-margin-x"> */}
//   <div id="message-container" className="cell medium-8 callout"></div>
//   <div id="form-container" className="grid-y" >
//     <form id="form" onSubmit={handleOnSubmit} className="grid-x">
//       <label htmlFor="message-input" className="cell small-2">Message</label>
//       <input type="text" id="message-input" className="cell small-8"></input>
//       <button type="submit" id="send-button" className="cell small-2">Send</button>
//       <label htmlFor="room-input" className="cell small-2">Room</label>
//       <input type="text" id="room-input" className="cell small-8"></input>
//       <button type="button" onClick={handleOnClick} id="room-button" className="cell small-2">Join</button>
//     </form>
//   {/* </div> */}
// </div>
// </div>