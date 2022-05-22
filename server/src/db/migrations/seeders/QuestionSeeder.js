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
        boxes: "2",
        image: "n/a",
      },
      {
        userId: baru.id,
        topic: "The masked emperor",
        boxes: "2",
        image: "n/a",
      },
      {
        userId: baru.id,
        topic: "Shipping routes and taxes for this season",
        boxes: "1",
        image: "n/a",
      },
      {
        userId: winter.id,
        topic: "Ways of dealing with Case and other 'console cowboys'",
        boxes: "1",
        image: "n/a",
      },
      {
        userId: winter.id,
        topic: "Razorgirl?",
        boxes: "1",
        image: "n/a",
      },
      {
        userId: winter.id,
        topic: "Location of Neuromancer",
        boxes: "1",
        image: "n/a",
      },
      {
        userId: roci.id,
        topic: "Martians, amirite?",
        boxes: "2",
        image: "n/a",
      },
      {
        userId: roci.id,
        topic: "These weird wormhole things.",
        boxes: "3",
        image: "n/a",
      },
      {
        userId: roci.id,
        topic: "Not being that guy.",
        boxes: "3",
        image: "n/a",
      },
      {
        userId: ender.id,
        topic: "10 hours into a print, and filament runs out",
        boxes: "2",
        image: "n/a",
      },
      {
        userId: ender.id,
        topic: "Level your bed!",
        boxes: "3",
        image: "n/a",
      },
      {
        userId: ender.id,
        topic: "Printing FOR the printer",
        boxes: "2",
        image: "n/a",
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