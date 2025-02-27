//users table.. -->userModel
const userModel = require("../models/UserModel")


const addUser1  = async(req,res)=>{

    //try catch if else...
    try{

        const createdUser = await userModel.create(req.body)
        res.status(201).json({
            message:"user created..",
            data:createdUser
        })



    }catch(err){

        res.status(500).json({
            message:"error",
            data:err
        })

    }



}


const addUser = async(req,res)=>{

        //req.body...
        const savedUser = await userModel.create(req.body)
        res.json({
            message:"User Saved Successfully",
            data:savedUser
        })



}
const getAllUsers = async(req,res)=>{


    const users = await userModel.find().populate("roleId")
    res.json({
        message:"User fetched successfully..",
        data:users
    })



}

const getUserById = async(req,res)=>{

    const foundUser = await userModel.findById(req.params.id)
    res.json({
        message:"user fetched successfully..",
        data:foundUser

    })

}

const deleteUserById = async(req,res)=>{


        const deletedUser = await userModel.findByIdAndDelete(req.params.id)
        res.json({
            message:"user deleted Successfully..",
            data:deletedUser
        })


}

module.exports = {
    addUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    addUser1
}

//addUser
//getUser
//deleteUser
//getUserById


//exports