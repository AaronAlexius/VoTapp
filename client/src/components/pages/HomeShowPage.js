import React from "react";
import { withRouter } from "react-router-dom";


const HomeShowPage = ({ user }) => {


  return (
    <div className="grid-x grid-margin-x align-center-middle text-center">
      <h1 className="cell small-8">Welcome to VoTapp!</h1>
    </div>
  )
}

export default withRouter(HomeShowPage)