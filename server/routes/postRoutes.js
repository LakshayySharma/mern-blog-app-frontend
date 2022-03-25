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
  try {
    const { title, content, description } = req.body;

    const userId = req.user._id;
    const author = req.user.name;
    let user = req.user;

    let post = new Post({
      userId,
      title,
      content,
      author,
      description,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
});

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
});

//comment on post
router.post("/:id/comment", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { text } = req.body;
    const name = req.user.name;
    const user = req.user._id;
    const user_comment = { text, name, user };
    post.comments.unshift(user_comment);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
});

//delete post
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (req.user.id !== post.userId.toString()) {
      return res.status(404).json({
        error: [{ msg: "Not authorized to delete" }],
      });
    }
    await post.remove();
    res.status(200).json({
      msg: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(404).json({
      error: [{ msg: "Not authorized" }],
    });
  }
});

export default router;
