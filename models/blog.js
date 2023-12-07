import mongoose from "mongoose";

const blog = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  timestamp: { type: Date, default: Date.now },
});

export const Blog = mongoose.model("Blog", blog);
