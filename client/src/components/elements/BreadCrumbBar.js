import React from "react"
import { Link } from "react-router-dom"

const BreadCrumbBar = ( { user }) => {

  return (
    <div className="grid-container">
        {user ? (
        <nav aria-label="You are here:" role="navigation">
          <ul className="breadcrumbs">
            <li><Link id="home" to="/">Home</Link></li>
            <li><Link className="" id="past-questions" to={`/users/${user.id}`} >
              Past Questions
            </Link></li>
            <li><Link className="" id="Create New Question Room" to="/rooms/new">
              Create A New Question
            </Link></li>
          </ul>
        </nav>) : (
        <nav aria-label="Sign in" role="navigation">
          <ul className="breadcrumbs">
            <li>Sign in or sign up to create your own votes!</li>
          </ul>
          </nav>)}
      </div>  
  )
}

export default BreadCrumbBar