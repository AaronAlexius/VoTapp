import NominationSerializer from "./NominationSerializer.js"

class TopicSerializer {
  static getSummary(topic) {
    const allowedAttributes = ["topicText"]
    let serializedTopic = {}

    for (const attribute of allowedAttributes) {
      serializedTopic[attribute] = topic[attribute]
    }
    return serializedTopic
  }

  static async getDetail(topic) {
    try {
      const allowedAttributes = ["topicText", "id"]
      let serializedTopic = {}

      for (const attribute of allowedAttributes) {
        serializedTopic[attribute] = topic[attribute]
      }
      const relatedNominations = await topic.$relatedQuery("nominations")
      const serializedNominations = await Promise.all(
        relatedNominations.map(async (nomination) => {
          return NominationSerializer.getSummary(nomination)
        })
      )
      serializedTopic.nominations = serializedNominations
      return serializedTopic
    } catch (error) {
      throw error
    }
  }  
}

export default TopicSerializer