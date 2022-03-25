import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  author: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  description: { type: String, required: true },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId },
      text: { type: String, required: true },
      name: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  likes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId },
    },
  ],
  date: { type: Date, default: Date.now },
});
const Post = mongoose.model("Post", postSchema);
export default Post;
