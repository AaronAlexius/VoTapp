import React, { useState, useEffect } from "react";
import NominationFormTile from "../elements/NominationFormTile";
import { useParams } from "react-router-dom"

const TopicShowPage = (props) => {
  const [memes, setMemes] = useState([])
  const [currentTopic, setCurrentTopic] = useState({
    topic: "",
  })
  const { id } = useParams()

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
      const response = await fetch(`/api/v1/rooms/${id}`)
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

  useEffect(() => {
    getCurrentTopic()
    getMemes()
  }, [])

  const memeMap = memes.map(meme => {
    return (
      <div key={meme.id} id={meme.id} className="meme">
        <div>{meme.name}</div>
        <img src={meme.url} alt={meme.name}/>
        <hr></hr>
      </div>
    )
  })

  return (
    <div className="grid-container largeContainer">
      <div className="centerHeaders">
        <h2 className="header">Make a comment on this topic!</h2>
        <h2 className="header callout text-center primary">{currentTopic.topic}</h2>
      </div>
      <div className="grid-x grid-margin-x grid-padding-x">
        <NominationFormTile memes={memes} />
        <NominationFormTile memes={memes} />
        <NominationFormTile memes={memes} />
        <NominationFormTile memes={memes} />
      </div>
    </div>
  )
}

export default TopicShowPage