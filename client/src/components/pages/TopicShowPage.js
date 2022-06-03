import React, { useState, useEffect } from "react";
import NominationFormTile from "../elements/NominationFormTile";
import { useParams } from "react-router-dom"

const TopicShowPage = (props) => {
  const [memes, setMemes] = useState([])
  const { id } = useParams()
  const [currentTopic, setCurrentTopic] = useState({
    topic: "",
  }) 

  const [userMeme, setUserMeme] = useState({
    id: "", 
    userId: "",
    topicId: "",
    memeUrl: "",
    numberVotes: null
  })
  const [showUserMeme, setShowUserMeme] = useState(false)

  const getMemes = async () => {
    try {
      const response = await fetch("https://api.imgflip.com/get_memes")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const body = await response.json()
      setMemes(body.data.memes)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const getCurrentTopic = async () => {
    try {
      const response = await fetch(`/api/v1/topics/${id}`)
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const body = await response.json()
      setCurrentTopic(body.topic)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const makeAMeme = async (nomination) => {
    try {
      const response = await fetch(`/api/v1/nominations/${id}`, { 
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(nomination)
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
        const userMeme = body.meme
        setUserMeme(userMeme)
        setShowUserMeme(true)
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  useEffect(() => {
    getCurrentTopic()
    getMemes()
  }, [])

  return (
    <div className="grid-container largeContainer">
      <div className="centerHeaders">
          {showUserMeme ? (<>
            <h1>Here is your meme!</h1>
            <img className="meme" src={userMeme.memeUrl}/>
            </>)
          : (<>
            <h2 className="header">Make a comment on this topic!</h2>
            <h2 className="header callout text-center primary">{currentTopic.topicText}</h2>
            </>)
          }
      </div>
      <div className="grid-x grid-margin-x grid-padding-x centerMemeCard">
        <NominationFormTile memes={memes} id={id} makeAMeme={makeAMeme} />
      </div>
    </div>
  )
}

export default TopicShowPage