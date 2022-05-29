import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import BreadCrumbBar from "../elements/BreadCrumbBar.js";


const HomeShowPage = ({ user }) => {


  return (
    <div className="grid-x grid-margin-x align-center-middle text-center">
      <h1 className="cell small-8">Welcome to VoTapp!</h1>
    </div>
  )
}

export default withRouter(HomeShowPage)