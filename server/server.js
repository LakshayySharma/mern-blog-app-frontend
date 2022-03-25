import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
const app = express();
connectDb();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server startes at port ${process.env.PORT}`);
});
