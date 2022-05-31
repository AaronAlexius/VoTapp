import React from "react";

const RedirectButton = ({ handleRedirect }) => {


  return (
    <button 
      type="button"
      onClick={() => handleRedirect()}
      id="redirect-button"
      className="cell callout primary small-1">
      Go to your new room!
    </button>
  )
}

export default RedirectButton