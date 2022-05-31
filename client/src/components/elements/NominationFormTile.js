import React, { useEffect, useState } from "react"
import ErrorList from "../layout/ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"

const NominationFormTile = (props) => {
  const { memes, id, makeAMeme } = props
  const [errors, setErrors] = useState([])
  

  const [nomination, setNomination] = useState({
    template_id: 0,
    text0: "",
    text1: ""
  })

  const handleInputChange = event => {
    setNomination({
      ...nomination,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleOnSubmit = event => {
    event.preventDefault()
    
    makeAMeme(nomination)
  }

  const handleClick = (id) => {
    setNomination({
      ...nomination,
      template_id: id
    })
  }

  const options = memes.map((meme, i) => {
    return (
      <div 
        key={i} 
        className="card-section"
        name={meme.name} 
        template_id={meme.id}
        box_count={meme.box_count}
        onClick={() => handleClick(meme.id)}
        >
        <img src={meme.url} alt={meme.name}/>
      </div>
    )
  })

  useEffect(() => {
  }, [])

  return (
    <div id="nomination-container" className="cell card small-12 medium-6">
      <form onSubmit={handleOnSubmit}>
        <label>
          <h4 className="card-divider text-center">Choose a meme</h4>
          <div className="memeMap slider" data-slider>
            <div className="card card-image">{options}</div>
          </div>
        </label>
        <div>
        </div>
          <label htmlFor="message-input" className="cell small-2">Text box 1</label>
            <input 
              type="text" 
              id="message-input" 
              className="cell small-8"
              name="text0"
              onChange={handleInputChange}
              value={nomination.text0}
              ></input>
          <label htmlFor="message-input" className="cell small-2">Text box 2</label>
            <input 
              type="text" 
              id="message-input" 
              className="cell small-8"
              name="text1"
              onChange={handleInputChange}
              value={nomination.text1}
              ></input>
          <button 
            type="submit" 
            id="send-button" 
            className="button">Make a meme
          </button>
      </form>
      {/* <h1>Here is your meme!</h1> */}
      {/* <img className="meme" src={meme.memeUrl}/> */}
    </div>
  )
}

export default NominationFormTile