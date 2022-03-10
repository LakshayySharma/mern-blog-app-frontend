import mongoose from "mongoose";
import Post from "../models/Post.js";
import express from "express";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.json(posts);
});

router.post("/", auth, async (req, res) => {
  const { title, content } = req.body;
  const user = req.user._id;
  const author = req.user.name;
  let post = new Post({
    user,
    title,
    content,
    author,
  });
  await post.save();
  res.status(201).json(post);
});

router.get("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

//comment on post
router.post("/:id/comment", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  const { text } = req.body;
  const name = req.user.name;
  const user = req.user._id;
  const user_comment = { text, name, user };
  post.comments.unshift(user_comment);
  await post.save();
  res.json(post.comments);
});

//delete comment on post

export default router;
