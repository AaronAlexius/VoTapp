import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const HomeShowPage = ({ currentUser }) => {
  // useEffect (() => {
  //   const { id, userName } = currentUser
  // }) 

  
  // const name = <li>{userName}</li>

  return (
    <div>
      <h1>Welcome to VoTapp!</h1>
      <Link id="Create New Question Room" to={`/rooms/new`}>
        Create a new question!
      </Link>
      <Link id="Checkout out your past questions" to={`/users/3`}>
        <ul className="userName">roci</ul>
      </Link>
    </div>
  )
}

export default HomeShowPage