import jwt from "jsonwebtoken";
import User from "../models/User.js";
const auth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      console.log(`middleware running`);
      next();
    } catch (error) {
      return res.status(400).json({
        error: [{ msg: "Not authorized" }],
      });
    }
  }
  if (!token) {
    return res.status(403).json({
      error: [{ msg: "Not authorized" }],
    });
  }
};
export { auth };
