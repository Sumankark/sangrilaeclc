import { ShortAbout } from "../schema/model.js";

export const addAboutSection = async (req, res) => {
  const { en, np } = req.body;

  if (!en && !np) {
    return res.status(400).json({
      success: false,
      message: "Description must be provided in either English or Nepali.",
    });
  }

  try {
    const newAboutSection = new ShortAbout({
      description: {
        en: en || "",
        np: np || "",
      },
    });

    await newAboutSection.save();

    res.status(201).json({
      success: true,
      message: "Short About section created successfully.",
      data: newAboutSection,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error.",
      error: error.message,
    });
  }
};

// Get the short about section
export const getAboutSection = async (req, res) => {
  try {
    const about = await ShortAbout.find();
    res.status(200).json({
      success: true,
      message: "Fetched About section data successfully.",
      result: about,
    });
  } catch (error) {
    console.error("Error fetching about section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching short about section.",
      error: error.message,
    });
  }
};

// Update a short about section
export const updateAboutSection = async (req, res) => {
  const { en, np } = req.body;

  try {
    const updateShortAbout = await ShortAbout.findById(req.params.id);

    if (!updateShortAbout) {
      return res.status(404).json({
        success: false,
        message: "Short About section not found.",
      });
    }

    updateShortAbout.description.en = en;
    updateShortAbout.description.np = np;

    await updateShortAbout.save();

    res.status(200).json({
      success: true,
      message: "Short About section updated successfully.",
      data: updateShortAbout,
    });
  } catch (error) {
    console.error("Error updating about section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating short about section.",
      error: error.message,
    });
  }
};

// Delete a short about section
export const deleteAboutSection = async (req, res) => {
  try {
    const deletedShortAbout = await ShortAbout.findByIdAndDelete(req.params.id);

    if (!deletedShortAbout) {
      return res.status(404).json({
        success: false,
        message: "Short About section not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Short About section deleted successfully.",
      data: deletedShortAbout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error while deleting short about section.",
      error: error.message,
    });
  }
};
