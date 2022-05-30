import React, { useState, useEffect } from "react";
import TopicTile from "../elements/TopicTile.js";
import { useParams } from "react-router-dom";
import BreadCrumbBar from "../elements/BreadCrumbBar.js";

const UserRecordsShowPage = (props) => {
  const [topics, setTopics] = useState([])

  const { id } = useParams()
  const userName = props.user.userName
  
  const getTopics = async () => {
    try {
      const response = await fetch(`/api/v1/users/${id}`)
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

  const topicTiles = topics.map(topic => {
    return (
      <TopicTile  
        key={topic.id}
        id={topic.id}
        topic={topic.topic}
      />
    )
  }) 

  return (
    <div className="grid-container">
      <h1>{userName} here are you old topics!</h1>
      <div className="grid-x grid-margin-x">
        {topicTiles}
      </div>
    </div>
  )
}

export default UserRecordsShowPage