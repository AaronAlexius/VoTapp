import React from "react";

const QuestionTile = (props) => {
  const { id, key, topic } = props

  return (
    <div key={key}>
      <li id={id}>{topic}</li>
    </div>
  )
}

export default QuestionTile