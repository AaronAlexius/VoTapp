import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import roomsRouter from "./api/v1/roomsRouter.js";
import nominationsRouter from "./api/v1/nominationsRouter.js";
import topicsRouter from "./api/v1/topicsRouter.js";
import clientRouter from "./clientRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter); 
rootRouter.use("/api/v1/rooms", roomsRouter);
rootRouter.use("/api/v1/nominations", nominationsRouter);
rootRouter.use("/api/v1/topics", topicsRouter)

export default rootRouter;