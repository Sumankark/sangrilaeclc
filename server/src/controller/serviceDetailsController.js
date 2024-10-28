// serviceDetailController.js
import { Service, ServiceDetail } from "../schema/model.js"; // Import the ServiceDetail model
import fs from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a new service detail
export const createServiceDetail = async (req, res) => {
  try {
    const { serviceId } = req.params; // Get the serviceId from the request parameters
    const { titleEn, titleNp, descriptionEn, descriptionNp } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    // Validate that the service exists
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    // Validate image presence
    if (!imagePath) {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    // Create a new service detail
    const newServiceDetail = new ServiceDetail({
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

    const savedDetail = await newServiceDetail.save();

    // Push the new service detail ID into the service's details array
    service.details.push(savedDetail._id);
    await service.save(); // Save the updated service document

    res.status(201).json({
      success: true,
      message: "Service Detail Created Successfully.",
      data: savedDetail,
    });
  } catch (error) {
    console.error("Error creating service detail:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Include error details for debugging (remove in production)
    });
  }
};

// Retrieve all service details
export const getServiceDetails = async (req, res) => {
  const { serviceId } = req.params;
  try {
    const service = await Service.findById(serviceId);
    const serviceDetail = await ServiceDetail.find({
      _id: { $in: service.details },
    });

    res.status(200).json({
      success: true,
      message: "Fetched Service Details Successfully.",
      result: serviceDetail,
    });
  } catch (error) {
    console.error("Error fetching service details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching service details.",
    });
  }
};

// Edit a service detail
export const editServiceDetail = async (req, res) => {
  try {
    const { titleEn, titleNp, descriptionEn, descriptionNp } = req.body;

    const updateServiceDetail = await ServiceDetail.findById(req.params.id);

    if (!updateServiceDetail) {
      return res.status(404).json({
        success: false,
        message: "Service detail not found.",
      });
    }

    // Delete previous image if a new one is uploaded
    if (req.file) {
      const oldImagePath = join(
        __dirname,
        "../../public",
        updateServiceDetail.image
      );
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image file:", err);
      });
      updateServiceDetail.image = req.file.filename;
    }

    if (titleEn) updateServiceDetail.title.en = titleEn;
    if (titleNp) updateServiceDetail.title.np = titleNp;
    if (descriptionEn) updateServiceDetail.description.en = descriptionEn;
    if (descriptionNp) updateServiceDetail.description.np = descriptionNp;

    await updateServiceDetail.save();

    res.json({
      success: true,
      message: "Service Detail updated Successfully.",
      data: updateServiceDetail,
    });
  } catch (error) {
    console.error("Error updating service detail:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while updating service detail",
    });
  }
};

// Delete a service detail
export const deleteServiceDetail = async (req, res) => {
  try {
    const deletedServiceDetail = await ServiceDetail.findByIdAndDelete(
      req.params.id
    );

    if (!deletedServiceDetail) {
      return res.status(404).json({
        success: false,
        message: "Service detail not found.",
      });
    }

    await Service.updateMany(
      { details: deletedServiceDetail._id },
      { $pull: { details: deletedServiceDetail._id } }
    );

    const imagePath = join(
      __dirname,
      "../../public",
      deletedServiceDetail.image
    );

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
        message: "Service Detail Deleted Successfully.",
        data: deletedServiceDetail,
      });
    });
  } catch (error) {
    console.error("Error deleting service detail:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
