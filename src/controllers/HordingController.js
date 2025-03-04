const hordingModel = require("../models/HordingModel");

const addHording = async (req, res) => {
  try {
    const savedHording = await hordingModel.create(req.body);
    res.status(201).json({
      message: "Hording added successfully",
      data: savedHording,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllHordings = async (req, res) => {
  try {
    const hordings = await hordingModel.find().populate("stateId cityId areaId userId");
    if (hordings.length === 0) {
      res.status(404).json({ message: "No hordings found" });
    } else {
      res.status(200).json({
        message: "Hording found successfully",
        data: hordings,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { addHording, getAllHordings };
