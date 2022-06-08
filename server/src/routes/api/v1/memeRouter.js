import express from "express";
import { Topic, Nomination } from "../../../models/index.js"
import TopicSerializer from "../../../serializers/TopicSerializer.js";

const memeRouter = new express.Router()

memeRouter.post("/", async (req, res) => {
  const { userId, topicId, memeUrl } = req.body
  try {
    const meme = await Nomination.query().insertAndFetch({ userId, topicId, memeUrl })
    return res.status(201).json({ meme: meme })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

memeRouter.get("/", async (req, res) => {
  const { topicId } = req.body
  try {
    const topic = await Topic.query().findById(topicId)
    const topicNominations = await TopicSerializer.getDetail(topic)
    return res.status(201).json({ nominations: topicNominations})
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default memeRouter