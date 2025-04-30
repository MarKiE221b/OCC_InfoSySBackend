import { Members } from "../models/Members.js";

export const addMembers = async (req, res) => {
  const {
    suc_id,
    fullname,
    office,
    positionOnBoard,
    dateOfAppointment,
    durationOfTerm,
    expirationOfTerm,
    remarks,
  } = req.body;

  try {
    // Handle file upload, check if the image is present
    const image = req.file ? req.file.path : null; // Get the file path from Multer (if present)

    // Create a new member object with the data
    const newMember = new Members({
      suc_id,
      fullname,
      office,
      positionOnBoard,
      dateOfAppointment,
      durationOfTerm,
      expirationOfTerm,
      status: "Active", // Default active status
      remarks,
      imagePath: image, // Store the image path
    });

    // Save the new member to the database
    await newMember.save();

    res.status(200).json({ message: "Successfully Added a Member!" });
  } catch (error) {
    res.status(500).json({ message: "System Error!", error: error.message });
    console.log(error);
  }
};

export const getAllMembers = async (req, res) => {
  try {
    const members = await Members.find();

    res
      .status(200)
      .json({ message: "Succesfully Retrieved Data!", data: members });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const getSUCMembers = async (req, res) => {
  const { id } = req.body;

  try {
    if (!id) {
      return res.status(400).json({ message: "Invalid or missing ID input" });
    }

    const members = await Members.find({ suc_id: id });

    if (!members.length) {
      return res.status(404).json({ message: "No members found for this ID" });
    }

    return res
      .status(200)
      .json({ message: "Successfully Retrieved Data!", data: members });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving members", error: error.message });
  }
};

export const updateMemberProfile = async (req, res) => {
  const { _id, ...otherFields } = req.body;

  try {
    const updateData = {
      ...otherFields,
    };

    const updateItem = await Members.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true, // Ensure schema validation
    });

    if (!updateItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item updated successfully", item: updateItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};
