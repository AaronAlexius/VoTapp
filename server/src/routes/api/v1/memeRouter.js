import express from "express";
import { Nomination } from "../../../models/index.js"

const memeRouter = new express.Router()

memeRouter.post("/", async (req, res) => {
  const { userId, topicId, memeUrl } = req.body
  try {
    const meme = await Nomination.query().insertAndFetch({ userId, topicId, memeUrl })
    return res.status(201).json({ meme: meme })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

export default memeRouter