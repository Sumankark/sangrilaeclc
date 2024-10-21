import { Goal } from "../schema/model.js";
import fs from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addGoal = async (req, res) => {
  try {
    const { titleEn, titleNp, descriptionEn, descriptionNp } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    if ((titleEn && titleNp) || (descriptionEn && descriptionNp)) {
      return res.status(400).json({
        success: false,
        message:
          "Either title and description must be provided in English or Nepali.",
      });
    }

    const newGoal = new Goal({
      image: imagePath,
      title: {
        en: titleEn || "",
        np: titleNp || "",
      },
      description: {
        en: descriptionEn || "",
        np: descriptionNp || "",
      },
    });

    await newGoal.save();

    res.status(201).json({
      success: true,
      message: "Goal Created Successfully.",
      data: newGoal,
    });
  } catch (error) {
    console.error("Error creating carousel Item: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getGoal = async (req, res) => {
  try {
    const goal = await Goal.find();
    res.status(200).json({
      success: true,
      message: "Fetched Goal data Successfully.",
      result: goal,
    });
  } catch (error) {
    console.error("Error fetching goal items: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching goal items.",
    });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { titleEn, titleNp, descriptionEn, descriptionNp } = req.body;

    const updateGoal = await Goal.findById(req.params.id);

    if (req.file) {
      updateGoal.image = req.file.filename;
    }

    updateGoal.title.en = titleEn;
    updateGoal.title.np = titleNp;
    updateGoal.description.en = descriptionEn;
    updateGoal.description.np = descriptionNp;

    await updateGoal.save();
    res.json({
      success: true,
      message: "Goal update Successfully.",
      data: updateGoal,
    });
  } catch (error) {
    console.error("Error update goal item: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while update goal",
    });
  }
};

export const deletedGoal = async (req, res) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);

    if (!deletedGoal) {
      return res.status(404).json({
        success: false,
        message: "Goal item not found.",
      });
    }

    const imagePath = join(__dirname, "../../public", deletedGoal.image);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image file: ", err);
        res.status(500).json({
          success: false,
          message: "Error deleting image file.",
        });
      }
    });

    res.status(200).json({
      success: true,
      message: "Deleted Successfully.",
      data: deletedGoal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
