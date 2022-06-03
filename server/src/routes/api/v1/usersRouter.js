import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import UserSerializer from "../../../serializers/UserSerializer.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, passwordConfirmation, userName } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, userName });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    return res.status(422).json({ errors: error });
  }
});

usersRouter.get("/:id", async (req, res) => {
  const userId = req.params.id

  try {
    const user = await User.query().findById(userId)
    const userTopics = await UserSerializer.getDetail(user)
    return res.status(200).json({ user: userTopics })
  } catch (err) {
    return res.status(500).json({ errors: err})
  }
})

export default usersRouter;