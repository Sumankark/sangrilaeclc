import { Service } from "../schema/model.js";

export const addService = async (req, res) => {
  const { title, description, details } = req.body;

  try {
    const imagePaths = req.files.map((file) => file.path);

    const newService = new Service({
      images: imagePaths,
      title: {
        en: title.en,
        np: title.np,
      },
      description: {
        en: description.en,
        np: description.np,
      },
      details,
    });

    await newService.save();

    res.status(201).json({
      success: true,
      message: "Service created successfully.",
      result: newService,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating service",
      error: error.message,
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
      result: service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
