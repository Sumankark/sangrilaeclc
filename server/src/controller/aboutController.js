import { About } from "../schema/model.js";
import fs from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addAboutSection = async (req, res) => {
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

    const newAbout = new About({
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

    await newAbout.save();

    res.status(201).json({
      success: true,
      message: "About Section Created Successfully.",
      data: newAbout,
    });
  } catch (error) {
    console.error("Error creating about Item: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getAboutSection = async (req, res) => {
  try {
    const about = await About.find();
    res.status(200).json({
      success: true,
      message: "Fetched About data Successfully.",
      result: about,
    });
  } catch (error) {
    console.error("Error fetching about items: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching about items.",
    });
  }
};

export const updateAboutSection = async (req, res) => {
  try {
    const { titleEn, titleNp, descriptionEn, descriptionNp } = req.body;

    const updateAboutSection = await About.findById(req.params.id);

    if (req.file) {
      updateAboutSection.image = req.file.filename;
    }

    updateAboutSection.title.en = titleEn;
    updateAboutSection.title.np = titleNp;
    updateAboutSection.description.en = descriptionEn;
    updateAboutSection.description.np = descriptionNp;

    await updateAboutSection.save();
    res.json({
      success: true,
      message: "Goal update Successfully.",
      data: updateAboutSection,
    });
  } catch (error) {
    console.error("Error update goal item: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while update goal",
    });
  }
};

export const deleteAboutSection = async (req, res) => {
  try {
    const deleteAboutSection = await About.findByIdAndDelete(req.params.id);

    if (!deleteAboutSection) {
      return res.status(404).json({
        success: false,
        message: "About item not found.",
      });
    }

    const imagePath = join(__dirname, "../../public", deleteAboutSection.image);

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
      data: deleteAboutSection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
