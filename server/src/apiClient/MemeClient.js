import got from "got"
import dotenv from "dotenv"
dotenv.config()
import qs from "qs"

const username = process.env.IMGFLIP_USERNAME
const password = process.env.IMGFLIP_PASSWORD
const memeURL = "https://api.imgflip.com/caption_image"

class MemeClient {
  static async postMeme({ template_id, text0, text1, text2, text3 }) {
    
    const submission = {
      template_id: template_id,
      username: username,
      password: password,
      boxes: [
        {
          text: text0
        },
        {
          text: text1 
        },
        {
          text: text2 
        },
        {
          text: text3
        }
      ]
    }
    
    try {
      debugger
      const response = await got.post(memeURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(submission)
      })
      if (!response.ok) {
        const errorMessage = `${response.status} ({response.statusText})`
        const error = new Error(errorMessage)
        throw error
      } else {
        const responseBody = response.body
        return JSON.parse(responseBody)
      }
    } catch (error) {
      return { error: error.message }
    }
  }
}

export default MemeClient