import { secretKey } from "../../config.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }
  const token = bearerToken.split(" ")[1];

  try {
    const infoObj = jwt.verify(token, secretKey);
    req._id = infoObj._id;
    next();
  } catch (error) {}
};
