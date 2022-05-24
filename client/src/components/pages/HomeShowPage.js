import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import AuthenticatedRoute from "../authentication/AuthenticatedRoute";

const HomeShowPage = (props) => {
  // AuthenticatedRoute()
  console.log(props.user)
  const [userObject, setUserObject] = useState({})
  
  // const person = user

  // useEffect(() => {
  // if (user) {
  //     setUserObject({
  //       id: user.id,
  //       userName: user.userName
  //     })
  //   }
  // }, [])

  // let address

  // if (user) {
  //   const id = user.id
  //   address = getDynamicURL(id)
  //   setUserPresent = true
  // }

  // const getDynamicURL = (id) => {
  //   let URL = "/users/"
  //   URL += id
  //   return URL
  // }
  
  // const authenticatedListItems = [
  //   <Link id="past-questions" to={`/users/${user.id}`} >
  //     Check out your past questions, {user.userName}
  //   </Link>,
  //   <Link id="Create New Question Room" to="/rooms/new">
  //     Create a new question!
  //   </Link>
  // ]

  const unauthenticatedListItems =[
    <h1>Sign in or sign up to create your own votes!</h1>
  ]

  return (
    <div>
      <h1>Welcome to VoTapp!</h1>
      <Link to="/users/3">Roci's Link</Link>
      {/* <div>{user ? authenticatedListItems : unauthenticatedListItems}</div> */}
    </div>
  )
}

export default withRouter(HomeShowPage)