import { Topic } from "../../../models/index.js";

class TopicSeeder {
  static async seed() {

    const topicData = [
      { topicText: "Living in Boston Be like" },
      { topicText: "The masked emperor" },
      { topicText: "Shipping routes and taxes for this season" },
      { topicText: "Ways of dealing with Case and other 'console cowboys'" },
      { topicText: "Razorgirl?" },
      { topicText: "Location of Neuromancer" },
      { topicText: "My cat be like..." },
      { topicText: "Favorite Moment from our last DnD Session" },
      { topicText: "Make a Meme about Chemical Bonding" },
      { topicText: "10 hours into a print, and filament runs out" },
      { topicText: "Level your bed!" },
      { topicText: "Printing FOR the printer" },
      { topicText: "Coding as told by non-coders" },
      { topicText: "Create a meme based on this week's chapter of Harry Potter" }
    ]

    for (const topicObject of topicData) {
      const currentTopic = await Topic.query().findOne(topicObject)

      if (!currentTopic) {
        await Topic.query().insert(topicObject)
      }
    }
  }
}

export default TopicSeeder