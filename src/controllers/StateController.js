const stateModel = require("../models/StateModel");

//addState
//getAllStates.

const addState = async (req, res) => {
  try {
    const savedState = await stateModel.create(req.body);
    res.status(201).json({
      message: "State added successfully",
      data: savedState,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getAllStates = async (req, res) => {

    try{
        
        const states = await stateModel.find();
        res.status(200).json({
            message: "All states fetched successfully",
            data: states
        })

    }catch(err){

        res.status(500).json({
            message: err
        })

    }

}
module.exports = {
    addState,
    getAllStates,
}
