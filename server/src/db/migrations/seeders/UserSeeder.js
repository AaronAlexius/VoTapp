import { User } from "../../../models/index.js";

class UserSeeder {
  static async seed() {
    const userData = [
      {
        email: "baru@email.com",
        password: "cormorant"
      },
      {
        email: "wintermute@email.com",
        password: "program"
      },
      {
        email: "rocinante@email.com",
        password: "legit"
      },
      {
        email: "troika@email.com",
        password: "ender"
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