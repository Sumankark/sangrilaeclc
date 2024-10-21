import fs from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { Gallery } from "../schema/model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addImage = async (req, res) => {
  try {
    const { titleEn, titleNp } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    console.log(req.file);
    if (!imagePath) {
      return res.status(400).json({
        success: true,
        message: "Image is required.",
      });
    }

    const newImage = new Gallery({
      image: imagePath,
      title: {
        en: titleEn || "",
        np: titleNp || "",
      },
    });

    await newImage.save();

    res.status(201).json({
      success: true,
      message: "Added Image to Gallery Successfully.",
      data: newImage,
    });
  } catch (error) {
    console.error("Error creating Gallery Item: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getImage = async (req, res) => {
  try {
    const image = await Gallery.find();
    res.status(200).json({
      success: true,
      message: "Fetched Image from Gallery Successfully.",
      result: image,
    });
  } catch (error) {
    console.error("Error fetching  Gallery Item: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching Gallery items.",
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const deleteImage = await Gallery.findByIdAndDelete(req.params.id);

    if (!deleteImage) {
      return res.status(404).json({
        success: false,
        message: "Image not found.",
      });
    }

    const imagePath = join(__dirname, "../../public", deleteImage.image);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image file: ", err);
        res.status(500).json({
          success: false,
          message: "Error deleting Image file.",
        });
      }
    });

    res.status(200).json({
      success: true,
      message: "Deleted Successfully.",
      data: deleteImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
