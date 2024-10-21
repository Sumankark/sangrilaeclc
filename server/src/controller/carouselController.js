import { Carousel } from "../schema/model.js";
import fs from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const addCarousel = async (req, res) => {
  try {
    const imagePath = req.file ? req.file.filename : null;

    const { titleEn, titleNp, descriptionEn, descriptionNp } = req.body;

    if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    if ((!titleEn && !titleNp) || (!descriptionEn && !descriptionNp)) {
      return res.status(400).json({
        success: false,
        message:
          "Either title and description must be provided in English or Nepali.",
      });
    }

    const newCarouselItem = new Carousel({
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

    await newCarouselItem.save();

    res.status(201).json({
      success: true,
      message: "Carousel created successfully.",
      data: newCarouselItem,
    });
  } catch (error) {
    console.error("Error creating carousel item:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getCarousel = async (req, res) => {
  try {
    const carousel = await Carousel.find();
    res.status(200).json({
      success: true,
      message: "Fetched carousel data successfully.",
      result: carousel,
    });
  } catch (error) {
    console.error("Error fetching carousel items:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching carousel items.",
    });
  }
};

export const updateCarousel = async (req, res) => {
  try {
    const updatedCarousel = await Carousel.findById(req.params.id);

    if (req.file) {
      updatedCarousel.image = req.file.filename;
    }

    updatedCarousel.title.en = req.body.titleEn;
    updatedCarousel.title.np = req.body.titleNp;
    updatedCarousel.description.en = req.body.descriptionEn;
    updatedCarousel.description.np = req.body.descriptionNp;

    await updatedCarousel.save();
    res.json({
      success: true,
      message: "Carousel Update Successfully",
      data: updatedCarousel,
    });
  } catch (error) {
    console.error("Error update carousel item: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server errror while update carousel",
    });
  }
};

export const deleteCarousel = async (req, res) => {
  try {
    const deletedCarousel = await Carousel.findByIdAndDelete(req.params.id);

    if (!deletedCarousel) {
      return res.status(404).json({
        success: false,
        message: "Carousel item not found.",
      });
    }

    const imagePath = join(__dirname, "../../public", deletedCarousel.image);

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting image file:", err);
        return res.status(500).json({
          success: false,
          message: "Error deleting image file.",
        });
      }
    });

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
      data: deletedCarousel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
