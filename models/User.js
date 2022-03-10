import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema({
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
});

userSchema.pre("save", function () {
  let password = bcrypt.hashSync(this.password, 10);
  this.password = password;
});
const User = mongoose.model("User", userSchema);
export default User;
