import React, { useState, useEffect } from "react";
// import TopicTile from "../elements/TopicTile.js";
import { useParams } from "react-router-dom";

const UserRecordsShowPage = (props) => {
  const [topics, setTopics] = useState([])
  const userId = props.match.params.id
  
  const getTopics = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      const bodyTopics = body.user.topics
      setTopics(bodyTopics)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }
  
  useEffect(() => {
    getTopics()
  }, [])

  const topicTiles = topics.map((topic, i) => {
    return (
      <div key={i} id={i} 
        className="cell callout small-12 medium-6 large-4 primary">
        <h5 className="text-center">{topic.topicText}</h5>
      </div>
    )
  }) 

  return (
    <div className="grid-container">
      <h1>Here are you old topics!</h1>
      <div className="grid-x grid-margin-x">
        {topicTiles}
      </div>
    </div>
  )
}

export default UserRecordsShowPage