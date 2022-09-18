import mongoose from "mongoose";
import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";
//update user
export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You are not allowed to update this account"));
  }
};

//delete a user
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: "User has been deleted." });
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You are not allowed to delete this account"));
  }
};

//get a user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//subscribe
export const subscribeUser = async (req, res, next) => {
  //req.user.id = the current user
  //req.params.id = user that we are goin to subscribe.
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json({ msg: "Subscription Successful" });
  } catch (error) {
    next(error);
  }
};
//unsubscribe
export const unsubscribeUser = async (req, res, next) => {
  //req.user.id = the current user
  //req.params.id = user that we are goin to subscribe.
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json({ msg: "Unsubscription Successful" });
  } catch (error) {
    next(error);
  }
};

//like
export const likeVideo = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("This video has been liked.");
  } catch (error) {
    next(error);
  }
};

//dislike
export const dislikeVideo = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    });
    res.status(200).json("This video has been disliked.");
  } catch (error) {
    next(error);
  }
};
