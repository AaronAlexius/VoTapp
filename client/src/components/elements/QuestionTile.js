import React from "react";

const QuestionTile = (props) => {
  const { topic } = props.question

  return (
    <div>
      <h4>{topic}</h4>
    </div>
  )
}

export default QuestionTile