import { User } from "../../../models/index.js";

class UserSeeder {
  static async seed() {
    const userData = [
      {
        email: "baru@email.com",
        userName: "traitor",
        password: "cormorant"
      },
      {
        email: "wintermute@email.com",
        userName: "wintermute",
        password: "program"
      },
      {
        email: "rocinante@email.com",
        userName: "Roci",
        password: "legit"
      },
      {
        email: "troika@email.com",
        userName: "Ender",
        password: "fdm"
      }
    ]

    for (const userObject of userData) {
      const currentUser = await User.query().findOne({ email: userObject.email })
      
      if (!currentUser) {
        await User.query().insert(userObject)
      }
    }
  }
}

export default UserSeeder