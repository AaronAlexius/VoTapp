import TopicSerializer from "./TopicSerializer.js"

class UserSerializer {
  static async getDetail(user) {
    try {
      const allowedAttributes = ["id", "userName"]
      let serializedUser = {}
      
      for (const attribute of allowedAttributes) {
        serializedUser[attribute] = user[attribute]
      }
      const relatedTopics = await user.$relatedQuery("topics")
      const serializedTopics = await Promise.all(
        relatedTopics.map(async (topic) => {
          return TopicSerializer.getSummary(topic)
        })
      )
      serializedUser.topics = serializedTopics
      return serializedUser
    } catch (error) {
      throw error 
    }
  }
}

export default UserSerializer