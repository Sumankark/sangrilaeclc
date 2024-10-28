import { Iframe } from "../schema/model.js";

export const addIframe = async (req, res) => {
  const { iframe } = req.body;
  try {
    const newIframe = new Iframe({
      url: iframe,
    });

    await newIframe.save();

    res.status(201).json({
      success: true,
      message: "Iframe is Created Successfully.",
      data: newIframe,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getIframe = async (req, res) => {
  try {
    const iframe = await Iframe.find();
    res.status(200).json({
      success: true,
      message: "Fetched iframe data Successfully.",
      result: iframe,
    });
  } catch (error) {
    console.error("Error fetching iframe: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching iframe.",
    });
  }
};

export const updateIframe = async (req, res) => {
  try {
    const { iframe } = req.body;

    const updateIframe = await Iframe.findById(req.params.id);

    updateIframe.url = iframe;

    await updateIframe.save();

    res.json({
      success: true,
      message: "iframe update Successfully.",
      data: updateIframe,
    });
  } catch (error) {
    console.error("Error update iframe item: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while update iframe",
    });
  }
};

export const deleteIframe = async (req, res) => {
  try {
    const deleteIframe = await Iframe.findByIdAndDelete(req.params.id);

    if (!deleteIframe) {
      return res.status(404).json({
        success: false,
        message: "Iframe not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted Successfully.",
      data: deleteIframe,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
