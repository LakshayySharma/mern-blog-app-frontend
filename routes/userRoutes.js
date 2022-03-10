import mongoose from "mongoose";
import User from "../models/User.js";
import express from "express";
import { check, validationResult } from "express-validator";
const router = express.Router();
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";
router.get("/", async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json(users);
});

router.post(
  "/",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        errors: [{ msg: "User Already Exists" }],
      });
    }
    user = await User.create(req.body);
    const payload = {
      id: user._id,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.VALIDITY,
    });

    res.status(201).json({
      token,
    });
  }
);

router.get("/:id", auth, async (req, res) => {
  if (req.params.id !== req.user._id.toString()) {
    return res.status(403).json({ error: [{ msg: "Sorry! Not Authorized" }] });
  }
  //console.log(req.user._id.toString());
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.get("/:id/posts", async (req, res) => {});

export default router;
