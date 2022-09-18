import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeVideo,
  subscribeUser,
  unsubscribeUser,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get user
router.get("/find/:id", getUser);

//subscribe user
router.put("/sub/:id", verifyToken, subscribeUser);

//unsubscribe user
router.put("/unsub/:id", verifyToken, unsubscribeUser);

//like a video
router.put("/like/:videoId", verifyToken, likeVideo);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;
