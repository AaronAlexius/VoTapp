class TopicSerializer {
  static getSummary(topic) {
    const allowedAttributes = ["topicText"]
    let serializedTopic = {}

    for (const attribute of allowedAttributes) {
      serializedTopic[attribute] = topic[attribute]
    }
    return serializedTopic
  }
}

export default TopicSerializer