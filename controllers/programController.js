import { Programs } from "../models/Programs.js";

export const addPrograms = async (req, res) => {
  const {
    suc_id,
    programName,
    major,
    copc,
    dateIssued,
    chedAccreditation,
    serialNumber,
  } = req.body;

  try {
    const programExists = await Programs.findOne({ programName });
    if (programExists)
      return res.status(400).json({ message: "Program already exists" });

    const createProgram = new Programs({
      suc_id,
      programName,
      major,
      copc,
      dateIssued,
      chedAccreditation,
      serialNumber,
    });

    console.log(createProgram);

    await createProgram.save();

    res.status(200).json({ message: "Successfully Added One Program!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating program", error: error.message });
  }
};

export const getAllPrograms = async (req, res) => {
  try {
    const programs = await Programs.find();

    res
      .status(200)
      .json({ message: "Succesfully Retrieved Data!", data: programs });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating program", error: error.message });
  }
};

export const getSUCPrograms = async (req, res) => {
  const { suc_id } = req.body;

  try {
    if (!suc_id) {
      return res.status(400).json({ message: "Invalid or missing ID input" });
    }

    const programs = await Programs.find({ suc_id: suc_id });

    if (!programs.length) {
      return res.status(404).json({ message: "No programs found for this ID" });
    }

    // Format the date for each program
    const formattedPrograms = programs.map((program) => ({
      ...program.toObject(),
      dateIssued: program.dateIssued.toISOString().split("T")[0],
    }));

    return res.status(200).json({
      message: "Successfully Retrieved Data!",
      data: formattedPrograms,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving programs", error: error.message });
  }
};

export const getCopcCounts = async (req, res) => {
  try {
    const copcCounts = await Programs.aggregate([
      {
        $group: {
          _id: "$copc",
          count: { $sum: 1 }
        }
      }
    ]);

    // Initialize counts for all possible values
    const result = { yes: 0, no: 0, "on-process": 0 };
    copcCounts.forEach(item => {
      const key = (item._id || "").toLowerCase();
      if (result.hasOwnProperty(key)) {
        result[key] = item.count;
      }
    });

    res.status(200).json({
      message: "Successfully retrieved COPC counts",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving COPC counts",
      error: error.message
    });
  }
};

export const getCopcCountsBySUC = async (req, res) => {
  const { suc_id } = req.body;

  if (!suc_id) {
    return res.status(400).json({ message: "Invalid or missing ID input" });
  }

  try {
    const copcCounts = await Programs.aggregate([
      { $match: { suc_id: suc_id } },
      {
        $group: {
          _id: "$copc",
          count: { $sum: 1 }
        }
      }
    ]);

    const result = { yes: 0, no: 0, "on-process": 0 };
    copcCounts.forEach(item => {
      const key = (item._id || "").toLowerCase();
      if (result.hasOwnProperty(key)) {
        result[key] = item.count;
      }
    });

    res.status(200).json({
      message: "Successfully retrieved COPC counts for SUC",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving COPC counts for SUC",
      error: error.message
    });
  }
};