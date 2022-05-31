import express from "express";
import MemeClient from "../../../apiClient/MemeClient.js";
import { Nomination } from "../../../models/index.js";

const nominationsRouter = new express.Router()

nominationsRouter.get("/:id", async (req, res) => {
  const topicId = req.params.id
  try {
    const memes = await Nomination.query().findById(topicId)
    return res.status(200).json({ memes: memes })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

nominationsRouter.post("/:id", async (req, res) => {
  const userId = req.user.id
  const body = req.body
  const topicId = req.params.id
  
  try {
    const memeClientResponse = await MemeClient.postMeme(body)
    const nominationObject = {}
    nominationObject.memeUrl = memeClientResponse.data.url
    nominationObject.userId = userId
    nominationObject.topicId = topicId
    const persistedMeme = await Nomination.query().insertAndFetch(nominationObject)
    return res.status(200).json({ meme: persistedMeme })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default nominationsRouter