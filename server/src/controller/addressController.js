import { Address } from "../schema/model.js";

export const addAddress = async (req, res) => {
  const { en, np } = req.body;

  try {
    if (!en && !np) {
      return res.status(400).json({
        success: false,
        message: "Description must be provided in either English or Nepali.",
      });
    }

    const newAddress = new Address({
      address: {
        en: en || "",
        np: np || "",
      },
    });

    await newAddress.save();

    res.status(201).json({
      success: true,
      message: "Address is added Successfully.",
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

// Get the short about section
export const getAddress = async (req, res) => {
  try {
    const address = await Address.find();
    res.status(200).json({
      success: true,
      message: "Fetched address data Successfully.",
      result: address,
    });
  } catch (error) {
    console.error("Error fetching address: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching address.",
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const { en, np } = req.body;

    const updateAddress = await Address.findById(req.params.id);

    updateAddress.address.en = en;
    updateAddress.address.np = np;

    await updateAddress.save();

    res.json({
      success: true,
      message: "address update Successfully.",
      data: updateAddress,
    });
  } catch (error) {
    console.error("Error update address: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while update address",
    });
  }
};

// Delete a short about section
export const deleteAddress = async (req, res) => {
  try {
    const deletedAddress = await Address.findByIdAndDelete(req.params.id);

    if (!deletedAddress) {
      return res.status(404).json({
        success: false,
        message: "address not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted Successfully.",
      data: deletedAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
