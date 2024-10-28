import { Contact } from "../schema/model.js";

export const addContact = async (req, res) => {
  const { phoneNumberEn, phoneNumberNp, email } = req.body;

  try {
    if (!phoneNumberEn && !phoneNumberNp) {
      return res.status(400).json({
        success: false,
        message: "phone number must be provided in English or Nepali.",
      });
    }

    const newContact = new Contact({
      phoneNumber: {
        en: phoneNumberEn || "",
        np: phoneNumberNp || "",
      },
      email: email,
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Contact is Created Successfully.",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json({
      success: true,
      message: "Fetched  contact data Successfully.",
      result: contact,
    });
  } catch (error) {
    console.error("Error fetching contact: ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching contact.",
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { phoneNumberEn, phoneNumberNp, email } = req.body;

    const contact = await Contact.findById(req.params.id);

    contact.phoneNumber.en = phoneNumberEn;
    contact.phoneNumber.np = phoneNumberNp;
    contact.email = email;

    await contact.save();

    res.json({
      success: true,
      message: "Contact update Successfully.",
      data: contact,
    });
  } catch (error) {
    console.error("Error update contact : ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while update contact",
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Iframe not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Deleted Successfully.",
      data: deletedContact,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
