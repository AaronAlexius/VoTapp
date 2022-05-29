/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./migrations/seeders/UserSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding users...")
    await UserSeeder.seed()
    console.log("Users seeded!")
    
    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder