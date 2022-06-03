import express from "express";
import objection from "objection";
import { Room } from "../../../models/index.js"

const roomsRouter = new express.Router()

roomsRouter.get("/", async (req, res) => {
  try {
    const rooms = await Room.query()
    return res.status(200).json({ rooms: rooms })
  } catch (err) {
    return res.status(500).json({ errors: err })
  }
})

roomsRouter.post("/new", async (req, res) => {
  const body = req.body

  try {
    const room = await Room.query().insertAndFetch( body )
    return res.status(201).json({ room: room })
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

roomsRouter.get("/:id", async (req, res) => {
  const roomId = req.params.id
  try {
    const room = await Room.query().findById(roomId)
    return res.status(200).json({ room: room })
  } catch (err) {
    return res.status(500).json({ errors: err})
  }
})

export default roomsRouter