import express from "express";
import { Topic } from "../../../models/index.js"
import TopicSerializer from "../../../serializers/TopicSerializer.js";

const topicsRouter = new express.Router()

topicsRouter.get("/", async (req, res) => {
  try {
    const topics = await Topic.query()
    const serializedTopics = topics.map(topics => {
    return TopicSerializer.getSummary(topics)
    })
    return res.status(200).json({ topics: serializedTopics })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

topicsRouter.post("/new", async (req, res) => {
  const { body } = req
  const formInput = cleanUserInput(body)
  const { topicText } = formInput

  try {
    const topic = await Topic.query().insertAndFetch({ topicText })
    return res.status(201).json({ topic: topic })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

topicsRouter.get("/:id", async (req, res) => {
  const topicId = req.params.id
  try {
    const topic = await Topic.query().findById(topicId)
    return res.status(200).json({ topic: topic })
  } catch (err) {
    return res.status(500).json({ errors: err})
  }
})

export default topicsRouter