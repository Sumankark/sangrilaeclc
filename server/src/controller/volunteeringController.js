import { Volunteering } from "../schema/model.js";
import fs from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addVolunteering = async (req, res) => {
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

    const newVolunteering = new Volunteering({
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

    await newVolunteering.save();

    res.status(201).json({
      success: true,
      message: "Volunteering Created Successfully.",
      data: newVolunteering,
    });
  } catch (error) {
    console.error("Error creating Volunteering Item: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getVolunteering = async (req, res) => {
  try {
    const volunteering = await Volunteering.find();
    res.status(200).json({
      success: true,
      message: "Fetched Volunteering data Successfully.",
      result: volunteering,
    });
  } catch (error) {
    console.error("Error fetching volunteering items: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching goal items.",
    });
  }
};

export const updateVolunteering = async (req, res) => {
  try {
    const { titleEn, titleNp, descriptionEn, descriptionNp } = req.body;

    const updateVolunteering = await Volunteering.findById(req.params.id);

    if (req.file) {
      updateVolunteering.image = req.file.filename;
    }

    updateVolunteering.title.en = titleEn;
    updateVolunteering.title.np = titleNp;
    updateVolunteering.description.en = descriptionEn;
    updateVolunteering.description.np = descriptionNp;

    await updateVolunteering.save();
    res.json({
      success: true,
      message: "Volunteering update Successfully.",
      data: updateVolunteering,
    });
  } catch (error) {
    console.error("Error update volunteering item: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while update goal",
    });
  }
};

export const deletedVolunteering = async (req, res) => {
  try {
    const deleteVolunteering = await Volunteering.findByIdAndDelete(
      req.params.id
    );

    if (!deleteVolunteering) {
      return res.status(404).json({
        success: false,
        message: "Goal item not found.",
      });
    }

    const imagePath = join(__dirname, "../../public", deleteVolunteering.image);

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
      data: deleteVolunteering,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
