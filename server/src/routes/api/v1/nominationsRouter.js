import express from "express";
import MemeClient from "../../../apiClient/MemeClient.js";
import { Nomination, Topic } from "../../../models/index.js";

const nominationsRouter = new express.Router()

nominationsRouter.get("/:id", async(req, res) => {
  console.log("req params", req.params)
  const topicId = req.params.id

  try {
    const topic = await Topic.query().findById(topicId)
    const nominations = await topic.$relatedQuery("nomination")
    return res.status(200).json({ nominations: nominations})
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
    return res.status(200).json({ meme: nominationObject })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default nominationsRouter