import { User } from "../../../models/index.js";
import { Question } from "../../../models/index.js";

class QuestionSeeder {
  static async seed() {
    const baru = await User.query().findOne({ email: "baru@email.com" })
    const winter = await User.query().findOne({ email: "wintermute@email.com" })
    const roci = await User.query().findOne({ email: "rocinante@email.com" })
    const ender = await User.query().findOne({ email: "troika@email.com" })

    const questionData = [
      {
        userId: baru.id,
        topic: "How to handle the issue of the Cancrioth",
      },
      {
        userId: baru.id,
        topic: "The masked emperor",
      },
      {
        userId: baru.id,
        topic: "Shipping routes and taxes for this season",
      },
      {
        userId: winter.id,
        topic: "Ways of dealing with Case and other 'console cowboys'",
      },
      {
        userId: winter.id,
        topic: "Razorgirl?",
      },
      {
        userId: winter.id,
        topic: "Location of Neuromancer",
      },
      {
        userId: roci.id,
        topic: "Martians, amirite?",
      },
      {
        userId: roci.id,
        topic: "These weird wormhole things.",
      },
      {
        userId: roci.id,
        topic: "Not being that guy.",
      },
      {
        userId: ender.id,
        topic: "10 hours into a print, and filament runs out",
      },
      {
        userId: ender.id,
        topic: "Level your bed!",
      },
      {
        userId: ender.id,
        topic: "Printing FOR the printer",
      }
    ]

    for (const questionObject of questionData) {
      const currentQuestion = await Question.query().findOne({ topic: questionObject.topic })

      if (!currentQuestion) {
        await Question.query().insert(questionObject)
      }
    }
  }
}

export default QuestionSeeder