class QuestionSerializer {
  static getSummary(question) {
    const allowedAttributes = ["id", "topic", "boxes", "image"]
    let serializedQuestion = {}

    for (const attribute of allowedAttributes) {
      serializedQuestion[attribute] = question[attribute]
    }
    return serializedQuestion
  }
}

export default QuestionSerializer