import { User } from "../schema/model.js";

export const isSuperAdmin = async (req, res, next) => {
  const id = req._id;
  try {
    const user = await User.findById(id);
    if (user.role !== "superAdmin") {
      res.status(403).json({
        success: false,
        message: "Access denied. superAdmin only do it.",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
