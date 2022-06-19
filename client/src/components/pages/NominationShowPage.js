import React, { useState, useEffect } from "react";
import { Redirect, Link, useParams } from "react-router-dom"

const NominationShowPage = props => {
  const topicId = props.match.params.id
  const [nominations, setNominations] = useState([])

  const getNominations = async () => {
    try {
      const response = await fetch(`/api/v1/nominations/${topicId}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw (error)
      }
      const body = await response.json()
      const nominationsArray = body.nominations
      setNominations(nominationsArray)
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`)
    }
  }

  const nominationMap = nominations.map(memeObject => {
    return( 
      <div key={memeObject.id} id={memeObject.id} className="cell card small-12 medium-3 large-4">
        <div className="card-divider">Your permanent meme url is here:  {memeObject.memeUrl}</div>
        <img src={memeObject.memeUrl}/>
      </div>
    )
  })
  
  let intervalId
  useEffect(() => {
    getNominations()
  }, [])

  return (
    <div className="grid-container largeContainer">
      <div className="centerHeaders">
        <h2 className="header">Nomination Show Page</h2>
      </div>
      <div className="centerHeaders">
        <h3 className="header">Nominations to consider</h3>
        <div>{nominationMap}
        </div>
      </div>
    </div>
  )
}

export default NominationShowPage