import React, { useState, useEffect } from "react";
import NominationFormTile from "../elements/NominationFormTile";
import { useParams } from "react-router-dom"

const TopicShowPage = (props) => {
  const [memes, setMemes] = useState([])
  const [currentTopic, setCurrentTopic] = useState({
    topic: "",
  })
  const [nominations, setNominations] = useState([])
  const { id } = useParams()

  const getNominations = async () => {
    try {
      const response = await fetch(`api/v1/nominations/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const body = await response.json()
      setNominations(body.data.nominations)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

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

  useEffect(() => {
    getCurrentTopic()
    getMemes()
    getNominations()
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

  const nominationMap = nominations.map(meme => {
    <div key={meme.userId} id={meme.userId} className="cell card small-12 medium-3 large-4">
      <div classname="card-divider">{meme.userId}</div>
      <img src={meme.memeUrl}/>
    </div>
  })

  return (
    <div className="grid-container largeContainer">
      <div className="centerHeaders">
        <h2 className="header">Make a comment on this topic!</h2>
        <h2 className="header callout text-center primary">{currentTopic.topicText}</h2>
      </div>
      <div className="centerHeaders">
        <h3 className="header">Nominations to consider</h3>
        {nominationMap}
      </div>
      <div className="center-contents">
        <NominationFormTile memes={memes} id={id}/>
      </div>
    </div>
  )
}

export default TopicShowPage