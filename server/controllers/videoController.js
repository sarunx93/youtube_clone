import mongoose from "mongoose";
import { createError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";
import { query } from "express";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
  } catch (error) {
    next(error);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    //we are using user id
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found."));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
    } else {
      return next(createError(403, "You can't update this video"));
    }
    res.status(200).json(updatedVideo);
  } catch (error) {
    next(error);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found."));
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
    } else {
      return next(createError(403, "You can't delete this video"));
    }
    res.status(200).json({ msg: "Video has been deleted." });
  } catch (error) {
    next(error);
  }
};
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found."));
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
};
export const addViews = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });

    res.status(200).json({ msg: "View has been increased." });
  } catch (error) {
    next(error);
  }
};
export const trending = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
export const subscribe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;
    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};

export const getByTags = async (req, res, next) => {
  const tagsQuery = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tagsQuery } }).limit(20);

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

export const getBySearch = async (req, res, next) => {
  const searchQuery = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: searchQuery, $options: "i" },
    });
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
