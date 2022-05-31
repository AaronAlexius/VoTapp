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

  // const [votingClosed, setVotingClosed] = useState(false)
  // const [nominationThatTheUserVotedOn, setNominationThatTheUserVotedOn] = useState(false)
  // 

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

  let intervalId
  useEffect(() => {
    getCurrentTopic()
    getMemes()
    getNominations()
  
    // Invoke the request every 3 seconds.
    intervalId = setInterval(getNominationsAndTopicOpenStatus, 3000);
  }, [])

  const getNominationsAndTopicOpenStatus = () => {
    // you could even combine getNominations with getTopicOpenStatus to do this in one request
    getNominations()
    // getTopicOpenStatus
    // this should keep checking if someone has clicked the "Close Voting" button by checking the `openStatus` of the topic
      // if this comes back with "openStatus" of false, 
        // then run clearInterval(intervalId)
        // and then redirect the user to "/rooms/:topicId/results" 
  }

  
  
  // Next steps 
  // finish the voting feature after you get the nominations to display on the top of the page
  // in this voting feature, clicking on a "nomination to consider" will add a vote for this user on this topic"
    // you will need a migration for "votes" just like in group projects
  // remove the extra forms, we only one 
  
  // everyone can see a button called "Close Voting / Review Results"
  // add a migration to add a "openStatus" column to a topic so that we know when voting is concluded


  // Assign this as callback to the CloseVotingButton
  // const closeButtonClick = (event) => {
    // clearInterval(intervalId)
    // make a post request with the topic id to set the topic openStatus to false on backend 
      // also on the backend, tally the votes and set the winning nomination id on the topic record to the one with the most votes
      // after fetch redirect to /rooms/15/results to display the best nomination
  // }

// on the results page, we will make an initial fetch to get the topic, display the winning nomination (and who made it) 

  


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
      <div className="grid-x grid-margin-x grid-padding-x">
        <NominationFormTile memes={memes} id={id}/>
      </div>
    </div>
  )
}

export default TopicShowPage