import { Users } from "../models/Users.js";
import { Members } from "../models/Members.js";

export const addUser = async (req, res) => {
  const { suc_id, fullname, username, password, role } = req.body;

  try {
    const newMember = new Members({
      suc_id,
      fullname,
      positionOnBoard: "Board Secretary",
      status: "Active",
    });

    await newMember.save();

    const createdMember = await Members.findOne({ fullname });

    const newUser = new Users({
      member_id: createdMember._id,
      username,
      password,
      access: true,
      role,
    });

    await newUser.save();

    res.status(200).json({ message: "Successfully Added a User!" });
  } catch (error) {
    res.status(500).json({ message: "System Error!", error: error.message });
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedItem = await Users.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully", item: deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};

export const fetchUsers = async (req, res) => {
  try {
    const userItems = await Users.find({ role: { $ne: "SuperAdmin" } })
      .select("-password")
      .populate({
        path: "member_id",
        model: "Members",
        select: "fullname positionOnBoard status suc_id",
      });

    res
      .status(200)
      .json({ message: "Succesfully Retrieved Data!", data: userItems });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};
