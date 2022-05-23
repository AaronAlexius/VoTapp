import React from "react";

const QuestionTile = (props) => {
  const { key, topic } = props

  return (
    <div>
      <li key={key}>{topic}</li>
    </div>
  )
}

export default QuestionTile