import React from "react";
import { Link } from "react-router-dom";

const HomeShowPage = () => {
  
  return (
    <div>
      <h1>Welcome to VoTapp!</h1>
      <Link id="Create New Question Room" to={`/rooms/new`}>
        Create a new question!
      </Link>
    </div>
  )
}

export default HomeShowPage