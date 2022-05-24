import QuestionSerializer from "./QuestionSerializer.js"

class UserSerializer {
  static async getDetail(user) {
    try {
      const allowedAttributes = ["id", "userName"]
      let serializedUser = {}
      
      for (const attribute of allowedAttributes) {
        serializedUser[attribute] = user[attribute]
      }
      const relatedQuestions = await user.$relatedQuery("questions")
      const serializedQuestions = await Promise.all(
        relatedQuestions.map(async (question) => {
          return QuestionSerializer.getSummary(question)
        })
      )
      serializedUser.questions = serializedQuestions
      return serializedUser
    } catch (error) {
      throw error 
    }
  }
}

export default UserSerializer