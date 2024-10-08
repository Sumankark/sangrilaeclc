import { User } from "../schema/model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secretKey } from "../../config.js";

export const createDefaultUser = async () => {
  try {
    const existingUser = await User.findOne({ userName: "admin" });

    if (!existingUser) {
      const hashPassword = await bcrypt.hash("admin", 10);

      const defaultUser = new User({
        userName: "admin",
        password: hashPassword,
        role: "user",
      });
      await User.create(defaultUser);
      console.log("Default User create successfully.");
    } else {
      console.log("Default admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating default user:", error);
  }
};

export const Login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const infoObj = { _id: user._id };
    const expireInfo = { expiresIn: "30d" };
    const token = jwt.sign(infoObj, secretKey, expireInfo);

    res.status(200).json({
      success: true,
      message: "User signed in successfully.",
      result: user,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getProfile = async (req, res) => {
  const id = req._id;

  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "user not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User data retrive Successfully.",
      result: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
      errror: error.message,
    });
  }
};

export const updateUsername = async (req, res) => {
  const id = req._id;
  const { userName } = req.body;

  try {
    const updateDetail = await User.findByIdAndUpdate(
      id,
      { userName },
      { new: true }
    );

    if (!updateDetail) {
      return res.status(404).json({
        success: false,
        message: "user not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "User Update Successfully",
      result: updateDetail,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  const id = req._id;
  const { oldPassword, newPassword } = req.body;

  try {
    const data = await User.findById(id);
    const hashPassword = data.password;

    const isValidPassword = await bcrypt.compare(oldPassword, hashPassword);

    if (isValidPassword) {
      const newHashPassword = await bcrypt.hash(newPassword, 10);

      await User.findByIdAndUpdate(
        id,
        { password: newHashPassword },
        { new: true }
      );

      res.status(201).json({
        success: true,
        message: "password update successfully.",
      });
    } else {
      const error = new Error("Credential does not match");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const addUser = async (req, res) => {
  const { userName, password, role } = req.body;

  try {
    if (req.user.role !== "superAdmin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied. Only superAdmins can add users.",
      });
    }

    if (!userName || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    if (req.user.role !== "superAdmin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Get User data successfully",
      result: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving users",
      error,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (req.user.role !== "superAdmin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }
    const { userName, password, role } = req.body;
    const updateData = { userName, role };

    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      updateData.password = hashPassword;
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updateUser) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "user update successfully",
      result: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "superAdmin") {
      res.status(403).json({
        success: true,
        message: "Access Denied.",
      });
    }

    const deleteUser = await User.findByIdAndDelete(req.params.id);

    if (!deleteUser) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "user delete successfully.",
      result: deleteUser,
    });
  } catch (error) {
    res.status.json({
      success: false,
      message: "Internal server error.",
    });
  }
};
