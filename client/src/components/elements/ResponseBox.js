import React from "react"

const ResponseBox = ({ index }) => {

  return(
    <div>
      <label htmlFor="message-input" className="cell small-2">Text box 3</label>
        <input 
          type="text" 
          id="message-input" 
          className="cell small-8"
          name={index}
          onChange={handleInputChange}
          value={textCells.name}
        ></input>
    </div>
  )
}

export default ResponseBox