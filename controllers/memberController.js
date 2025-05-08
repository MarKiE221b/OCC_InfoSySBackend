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
    email,
    phoneNumber,
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
      email,
      phoneNumber,
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

    // Convert image to base64 if imagePath exists
    const membersWithBase64Image = await Promise.all(
      members.map(async (member) => {
      let imageBase64 = null;
      if (member.imagePath) {
        try {
        const fs = await import('fs/promises');
        const imageBuffer = await fs.readFile(member.imagePath);
        imageBase64 = imageBuffer.toString('base64');
        } catch (err) {
        imageBase64 = null;
        }
      }
      return {
        ...member.toObject(),
        image: imageBase64,
      };
      })
    );

    return res
      .status(200)
      .json({ message: "Successfully Retrieved Data!", data: membersWithBase64Image });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving members", error: error.message });
  }
};


export const updateMemberProfile = async (req, res) => {
  const { _id, ...otherFields } = req.body;

  const image = req.file ? req.file.path : null; // Get the file path from Multer (if present)

  try {
    const updateData = {
      ...otherFields,
    };

    if (image) {
      updateData.imagePath = image; // Update the image path if a new image is uploaded
    }

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

export const deleteMember = async (req, res) => {
  const { _id } = req.body;

  try {
    const deletedMember = await Members.findByIdAndDelete(_id);

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting member", error: error.message });
  }
};
