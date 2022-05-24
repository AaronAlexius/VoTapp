import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";


const HomeShowPage = ({ user }) => {
  return (
    <div>
      <h1>Welcome to VoTapp!</h1>
      {user ? (<>
        <Link id="past-questions" to={`/users/${user.id}`} >
          Check out your past questions, {user.userName}
        </Link>
        <br/>
        <Link id="Create New Question Room" to="/rooms/new">
          Create a new question!
        </Link>
      </>) : (<h1>Sign in or sign up to create your own votes!</h1>)}
    </div>
  )
}

export default withRouter(HomeShowPage)