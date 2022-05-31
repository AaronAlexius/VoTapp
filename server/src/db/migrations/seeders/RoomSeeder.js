import { User, Topic, Room } from "../../../models/index.js"

class RoomSeeder {
  static async seed() {
    const roci = await User.query().findOne({ email: "rocinante@email.com" })
    const baru = await User.query().findOne({ email: "baru@email.com" })
    const winter = await User.query().findOne({ email: "wintermute@email.com" })
    const ender = await User.query().findOne({ email: "troika@email.com" })

    const cat = await Topic.query().findOne({ topicText: "My cat be like..." })
    const dnd = await Topic.query().findOne({ topicText: "Favorite Moment from our last DnD Session" })
    const bond = await Topic.query().findOne({ topicText: "Make a Meme about Chemical Bonding" })
    const potter = await Topic.query().findOne({ topicText: "Create a meme based on this week's chapter of Harry Potter" })
    const coding = await Topic.query().findOne({ topicText: "Coding as told by non-coders" })
    const bostonLife = await Topic.query().findOne({ topicText: "Living in Boston Be like" })
    const caseMan = await Topic.query().findOne({ topicText: "Ways of dealing with Case and other 'console cowboys'" })
    const razor = await Topic.query().findOne({ topicText: "Razorgirl?" })
    const neuro = await Topic.query().findOne({ topicText: "Location of Neuromancer" })
    const emperor = await Topic.query().findOne({ topicText: "The masked emperor" })
    const tax = await Topic.query().findOne({ topicText: "Shipping routes and taxes for this season" })
    const runout = await Topic.query().findOne({ topicText: "10 hours into a print, and filament runs out" })
    const bed = await Topic.query().findOne({ topicText: "Level your bed!" })
    const prints = await Topic.query().findOne({ topicText: "Printing FOR the printer" })
    
    const roomData = [
      {
        userId: roci.id,
        topicId: cat.id, 
        roomUrl: "1"
      },
      {
        userId: roci.id,
        topicId: dnd.id, 
        roomUrl: "2"
      },
      {
        userId: roci.id,
        topicId: bond.id, 
        roomUrl: "3"
      },
      {
        userId: roci.id,
        topicId: potter.id, 
        roomUrl: "4"
      },
      {
        userId: roci.id,
        topicId: coding.id, 
        roomUrl: "5"
      },
      {
        userId: roci.id,
        topicId: bostonLife.id, 
        roomUrl: "6"
      },
      {
        userId: winter.id,
        topicId: caseMan.id, 
        roomUrl: "7"
      },
      {
        userId: winter.id,
        topicId: razor.id, 
        roomUrl: "8"
      },
      {
        userId: winter.id,
        topicId: neuro.id, 
        roomUrl: "9"
      },
      {
        userId: baru.id,
        topicId: emperor.id, 
        roomUrl: "9"
      },
      {
        userId: baru.id,
        topicId: tax.id, 
        roomUrl: "10"
      },
      {
        userId: ender.id,
        topicId: runout.id, 
        roomUrl: "11"
      },
      {
        userId: ender.id,
        topicId: bed.id, 
        roomUrl: "12"
      },
      {
        userId: ender.id,
        topicId: prints.id, 
        roomUrl: "13"
      }
    ]

    for (const roomObject of roomData) {
      const currentRoom = await Room.query().findOne({ roomUrl: roomObject.roomUrl })

      if (!currentRoom) {
        await Room.query().insert(roomObject)
      }
    }
  }
}

export default RoomSeeder