import React, { useEffect, useState } from "react"
import ErrorList from "../layout/ErrorList.js"
import translateServerErrors from "../../services/translateServerErrors.js"
import qs from 'qs'

const NominationFormTile = (props) => {
  const { memes } = props
  const [errors, setErrors] = useState([])
  const [meme, setMeme] = useState({
    success: "", 
    data: {
      url: "",
      page_url: "",
    },
  })

  const [nomination, setNomination] = useState({
    template_id: 0,
    username: "",
    password: "",
    text0: "",
    text1: ""
  })

  
  const makeAMeme = async () => {
    console.log("Form sent")
    try {
      const response = await fetch("https://api.imgflip.com/caption_image", { 
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: qs.stringify(nomination)
      })
      if(!response.ok) {
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
        const userMeme = body
        setMeme(userMeme)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
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
    <div id="nomination-container" className="nominationTile">
      <form onSubmit={handleOnSubmit}>
        <label>
          <h4>Select your meme from the collection below</h4>
        <div className="memeMap">
          {options}
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
      <h1>Here is your meme!</h1>
      <img className="meme" src={meme.data.url}/>
    </div>
  )
}

export default NominationFormTile