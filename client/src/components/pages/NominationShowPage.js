import React, { useState, useEffect } from "react";
import { Redirect, Link, useParams } from "react-router-dom"

const NominationShowPage = props => {
  const { id } = useParams()
  const [nominations, setNominations] = useState([])
  const [votingClosed, setVotingClosed] = useState(false)
  const [nominationThatTheUserVotedOn, setNominationThatTheUserVotedOn] = useState(false)

  // const getNominations = async () => {
  //   try {
  //     const response = await fetch(`api/v1/memes/${id}`)
  //     if (!response.ok) {
  //       const errorMessage = `${response.status} (${response.statusText})`
  //       const error = new Error(errorMessage)
  //       throw (error)
  //     }
  //     const body = await response.json()
  //     setNominations(body.topics)
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`)
  //   }
  // }

  // const nominationMap = nominations.map(meme => {
  //   <div key={meme.userId} id={meme.userId} className="cell card small-12 medium-3 large-4">
  //     <div classname="card-divider">{meme.userId}</div>
  //     <img src={meme.memeUrl}/>
  //   </div>
  // })

  // let intervalId
  // useEffect(() => {
  //   getNominations()
  //   intervalId = setInterval(getNominationsAndTopicOpenStatus, 3000)
  // })
  // const getNominationsAndTopicOpenStatus = () => {
  //   getNominations()
  //   getTopicOpenStatus()
  // }

  return (
    <div className="grid-container largeContainer">
      <div className="centerHeaders">
        <h2 className="header">A Header for this page</h2>
      </div>
      <div className="centerHeaders">
        <h3 className="header">Nominations to consider</h3>
        {/* {nominationMap} */}
      </div>
    </div>
  )
}

export default NominationShowPage