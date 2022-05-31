/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./migrations/seeders/UserSeeder.js"
import TopicSeeder from "./migrations/seeders/TopicSeeder.js"
import RoomSeeder from "./migrations/seeders/RoomSeeder.js"

class Seeder {
  static async seed() {
    console.log("Seeding users...")
    await UserSeeder.seed()
    console.log("Users seeded!")
    
    console.log("Seeding topics...")
    await TopicSeeder.seed()
    console.log("Topics seeded!")

    console.log("Seeding rooms..")
    await RoomSeeder.seed()
    console.log("Rooms seeded!")

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder