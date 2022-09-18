import express from "express";
import {
  addVideo,
  addViews,
  deleteVideo,
  getBySearch,
  getByTags,
  getVideo,
  random,
  subscribe,
  trending,
  updateVideo,
} from "../controllers/videoController.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
//add
router.post("/", verifyToken, addVideo);

//update
router.put("/:id", verifyToken, updateVideo);

//delete
router.delete("/:id", verifyToken, deleteVideo);

//get
router.get("/find/:id", getVideo);

//increment views
router.put("/view/:id", addViews);

//get trending vdo
router.get("/trend", trending);

//get random vdos
router.get("/random", random);

//get subscribed vdo
router.get("/sub", verifyToken, subscribe);

//get video by tags
router.get("/tags", getByTags);

//search
router.get("/search", getBySearch);
export default router;
