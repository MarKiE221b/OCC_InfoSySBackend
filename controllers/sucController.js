import { Sucs } from "../models/Suc.js";

export const addSucs = async (req, res) => {
  const { region, name } = req.body;

  try {
    const userExists = await Sucs.findOne({ name });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const createSuc = new Sucs({
      region,
      name,
    });

    await createSuc.save();

    res.status(200).json({ message: "Successfully Added One SUC!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export const updateSucs = async (req, res) => {
  const { _id, latitude, longitude, ...otherFields } = req.body;

  try {
    const updateData = {
      ...otherFields,
    };

    if (latitude !== undefined && longitude !== undefined) {
      updateData.coordinates = [latitude, longitude];
    }

    const updateItem = await Sucs.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true, // Ensure schema validation
    });

    if (!updateItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item updated successfully", item: updateItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error });
  }
};

export const getSucs = async (req, res) => {
  try {
    const sucs = await Sucs.find();

    res
      .status(200)
      .json({ message: "Succesfully Retrieved Data!", data: sucs });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};
