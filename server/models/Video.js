import mongoose from "mongoose";
const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: "This is a description.",
    },
    imgUrl: {
      type: String,
      require: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
