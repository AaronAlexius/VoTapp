import React, { useState } from "react"

const NominationFormTile = (props) => {
  const { memes, makeAMeme } = props
  const [selected, setSelected] = useState()
  const [textBoxArray, setTextBoxArray] = useState([])
  const [nomination, setNomination] = useState({
    template_id: 0,
    name: "",
    box_count: 0,
    text0: "",
    text1: "",
    text2: "",
    text3: "", 
    text4: ""
  })
  const defaultState = {
    template_id: 0,
    name: "",
    box_count: 0,
    text0: "",
    text1: "",
    text2: "",
    text3: "", 
    text4: ""
  }

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
  
  const handleClick = meme => {
    setNomination({
      ...nomination,
      name: meme.name,
      template_id: meme.id,
      box_count: meme.box_count
    })
  }

  const options = memes.map((meme, i) => {
    const id = i
    return (
      <div 
        key={id} 
        id={id}
        className="meme card-section"
        name={meme.name} 
        template_id={meme.id}
        box_count={meme.box_count}
        onClick={() => handleClick(meme)}
        >
        <label htmlFor={meme.name}>
          <img src={meme.url} alt={meme.name}  />
        </label>
      </div>
    )
  })

  return (
    <div id="nomination-container" className="cell card small-12 medium-8">
      <form onSubmit={handleOnSubmit}>
        <label>
          <h4 className="card-divider text-center">Choose a meme</h4>
          <div className="memeMap slider" data-slider>
            <div id="options" className="card card-image">{options}</div>
          </div>
        </label>
        <div>
          <input type="text" readOnly value={nomination.name}/>
        </div>
          {nomination.box_count >= 1 ? (<>
            <label htmlFor="message-input" className="cell small-2">Text box 1
              <input 
                type="text" 
                id="message-input" 
                className="cell small-8"
                name="text0"
                onChange={handleInputChange}
                value={nomination.text0}
                >
              </input>
            </label>
          </>) : ""}
          {nomination.box_count >= 2 ? (<>
            <label htmlFor="message-input" className="cell small-2">Text box 2</label>
              <input 
                type="text" 
                id="message-input" 
                className="cell small-8"
                name="text1"
                onChange={handleInputChange}
                value={nomination.text1}
                >
              </input>
          </>) : ""}
          {nomination.box_count >= 3 ? (<>
            <label htmlFor="message-input" className="cell small-2">Text box 3</label>
              <input 
                type="text" 
                id="message-input" 
                className="cell small-8"
                name="text2"
                onChange={handleInputChange}
                value={nomination.text2}
                >
              </input>
          </>) : ""}
          {nomination.box_count >= 4 ? (<>
            <label htmlFor="message-input" className="cell small-2">Text box 4</label>
              <input 
                type="text" 
                id="message-input" 
                className="cell small-8"
                name="text3"
                onChange={handleInputChange}
                value={nomination.text3}
                >
              </input>
          </>) : ""}
          {nomination.box_count >= 5 ? (<>
            <label htmlFor="message-input" className="cell small-2">Text box 5</label>
              <input 
                type="text" 
                id="message-input" 
                className="cell small-8"
                name="text4"
                onChange={handleInputChange}
                value={nomination.text4}
                >
              </input>
          </>) : ""}
          <button 
            type="submit" 
            id="send-button" 
            className="button">Make a meme
          </button>
      </form>
     
    </div>
  )
}

export default NominationFormTile