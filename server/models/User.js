import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", function () {
  let password = bcrypt.hashSync(this.password, 10);
  this.password = password;
});

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "userId",
});
const User = mongoose.model("User", userSchema);
export default User;
