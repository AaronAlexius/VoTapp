import express from "express";
import objection from "objection";
const { ValidationError } = objection;
import { Question } from "../../../models/index.js"
import QuestionSerializer from "../../../serializers/QuestionSerializer.js";
import cleanUserInput from "../../../services/cleanUserInput.js"
import { User } from "../../../models/index.js"

const roomsRouter = new express.Router()

roomsRouter.get("/", async (req, res) => {
  try {
    const questions = await Question.query()
    const serializedQuestions = questions.map(questions => {
      return QuestionSerializer.getSummary(questions)
    })
    return res.status(200).json({ questions: serializedQuestions })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

roomsRouter.post("/new", async (req, res) => {
  const userId = req.user.id
  const { body } = req
  const formInput = cleanUserInput(body)
  const { topic } = formInput

  try {
    const question = await Question.query().insertAndFetch({ topic, userId })
    return res.status(201).json({ question: question })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    }
    return res.status(500).json({ errors: error })
  }
})

roomsRouter.get("/:id", async (req, res) => {
  const topicId = req.params.id
  try {
    const topic = await Question.query().findById(topicId)
    return res.status(200).json({ topic: topic })
  } catch (err) {
    return res.status(500).json({ errors: err})
  }
})

export default roomsRouter