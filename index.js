import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Blog } from "./models/blog.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

//get all blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send(blogs);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

//get blog by its id
app.get("/api/blog/:blogId", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    res.send(blog);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

//get blogs filter by author
app.get("/api/blogs/:blogAuthor", async (req, res) => {
  try {
    console.log(req.params);
    const blog = await Blog.find({ author: req.params.blogAuthor });
    res.send(blog);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// create blog post
app.post("/api/blog", async (req, res) => {
  try {
    let blogPost = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });
    blogPost = await blogPost.save();
    res.send(blogPost);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

//update blog post by its id
app.put("/api/blog/:blogId", async (req, res) => {
  try {
    console.log(req.body);
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.blogId,
      req.body,
      { new: true }
    );
    res.send(updatedBlog);
  } catch (error) {
    console.log(error);
  }
});

//delete blog post by its id
app.delete("/api/blog/:blogId", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.blogId);
    res.send(deletedBlog);
  } catch (error) {
    console.log(error);
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
