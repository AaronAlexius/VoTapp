import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import BreadCrumbBar from "../elements/BreadCrumbBar";

const TopBar = ({ user }) => {
  // const { id, userName } = user
  
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>
  ];

  const userNavigation = [
    <li key="user-name">
      {user ? `Welcome to VoTapp, ${user.userName}` : ""}
    </li>
  ]

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">VoTapp</li>
          <li className="menu-text">{user ? userNavigation : ""}</li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;