import mongoose from "mongoose";
import User from "../models/User.js";
import express from "express";
import bcrypt from "bcryptjs";
const router = express.Router();
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

//signin user
router.post(
  "/",

  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        error: [
          {
            msg: "Invalid Credentials",
          },
        ],
      });
    }
    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(404).json({
        error: [
          {
            msg: "Invalid Credentials",
          },
        ],
      });
    }
    const payload = {
      id: user._id,
    };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.VALIDITY,
    });
    res.status(202).json({
      token,
    });
  }
);

// router.get("/", auth, (req, res) => {});

export default router;
