import { Service } from "../schema/model.js";

export const createService = async (req, res) => {
  try {
    const {
      titleEn,
      titleNp,
      descriptionEn,
      descriptionNp,
      detailEn,
      detailNp,
    } = req.body;

    const imagePath = req.file ? req.file.filename : null;

    if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }
    if ((titleEn && titleNp) || descriptionEn || descriptionNp) {
      return res.status(400).json({
        success: false,
        message:
          "Either title and description must be provided in English or Nepali",
      });
    }

    const newService = new Service({
      imagePath: imagePath,
      title: {
        en: titleEn || "",
        np: titleNp || "",
      },
      description: {
        en: descriptionEn || "",
        np: descriptionNp || "",
      },
      detail: {
        en: detailEn || "",
        np: detailNp || "",
      },
    });

    await newService.save();
    res.status(201).json({
      success: true,
      message: "Service Created Successfully.",
      data: newService,
    });
  } catch (error) {
    console.error("Error creating carousel Item: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getService = async (req, res) => {};

export const editService = async (req, res) => {};

export const deleteService = async (req, res) => {};
