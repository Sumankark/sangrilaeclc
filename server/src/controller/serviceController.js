import { Service } from "../schema/model.js";
import fs from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const createService = async (req, res) => {
  try {
    const { titleEn, titleNp, descriptionEn, descriptionNp } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    if (!titleEn && !titleNp && !descriptionEn && !descriptionNp) {
      return res.status(400).json({
        success: false,
        message: "At least one title and description must be provided.",
      });
    }

    const newService = new Service({
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

    await newService.save();

    res.status(201).json({
      success: true,
      message: "Service Created Successfully.",
      data: newService,
    });
  } catch (error) {
    console.error("Error creating service item:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getSpecificService = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Service.findById(id);
    res.status(200).json({
      success: true,
      message: "Fetch Data Successfully.",
      result: result,
    });
  } catch (error) {
    console.error("Error fetching services items:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching service items.",
    });
  }
};

export const getService = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      success: true,
      message: "Fetched Services data Successfully.",
      result: services,
    });
  } catch (error) {
    console.error("Error fetching services items:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching service items.",
    });
  }
};

export const editService = async (req, res) => {
  try {
    const { titleEn, titleNp, descriptionEn, descriptionNp } = req.body;

    const updateService = await Service.findById(req.params.id);

    if (!updateService) {
      return res.status(404).json({
        success: false,
        message: "Service item not found.",
      });
    }

    // Delete previous image if a new one is uploaded
    if (req.file) {
      const oldImagePath = join(__dirname, "../../public", updateService.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image file:", err);
      });
      updateService.image = req.file.filename;
    }

    if (titleEn) updateService.title.en = titleEn;
    if (titleNp) updateService.title.np = titleNp;
    if (descriptionEn) updateService.description.en = descriptionEn;
    if (descriptionNp) updateService.description.np = descriptionNp;

    await updateService.save();

    res.json({
      success: true,
      message: "Service updated Successfully.",
      data: updateService,
    });
  } catch (error) {
    console.error("Error updating service item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating service",
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);

    if (!deletedService) {
      return res.status(404).json({
        success: false,
        message: "Service item not found.",
      });
    }

    const imagePath = join(__dirname, "../../public", deletedService.image);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image file:", err);
        return res.status(500).json({
          success: false,
          message: "Error deleting image file.",
        });
      }
      res.status(200).json({
        success: true,
        message: "Deleted Successfully.",
        data: deletedService,
      });
    });
  } catch (error) {
    console.error("Error deleting service item:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
