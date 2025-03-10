//users table.. -->userModel
const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const mailUtil = require("../utils/MailUtil")

const loginUser = async (req, res) => {
  //req.body email and password: password

  //password -->plain -->db -->encrypted
  //bcrypt  --> plain,enc --> match : true
  const email = req.body.email;
  const password = req.body.password;
  //select * from users where email =? and password = ?
  //userModel.find({email:email,password:password})
  //email --> object -->abc --{passwird:hashedPasseord}
  //normal passwoed compare -->

  //const foundUserFromEmail = userModel.findOne({email:req.body.email})
  const foundUserFromEmail = await userModel.findOne({ email: email }).populate("roleId")
  console.log(foundUserFromEmail);
  //check if email is exist or not//
  if (foundUserFromEmail != null) {
    //password
    //normal -plain req.bodyy --- databse -->match  --> true | false
    //const isMatch = bcrypt.compareSync(req.body.password,foundUserFromEmail.password)
    const isMatch = bcrypt.compareSync(password, foundUserFromEmail.password);
    //true | false
    if (isMatch == true) {
      res.status(200).json({
        message: "login success",
        data: foundUserFromEmail,
      });
    } else {
      res.status(404).json({
        message: "invalid cred..",
      });
    }
  } else {
    res.status(404).json({
      message: "Email not found..",
    });
  }
};

const signup = async (req, res) => {
  //try catch if else...
  try {
    //password encrupt..
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedPassword;
    const createdUser = await userModel.create(req.body);

    //send mail to user...
    //const mailResponse = await mailUtil.sendingMail(createdUser.email,"welcome to eadvertisement","this is welcome mail")
    await mailUtil.sendingMail(createdUser.email,"welcome to eadvertisement","this is welcome mail")

    res.status(201).json({
      message: "user created..",
      data: createdUser,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "error",
      data: err,
    });
  }
};

const addUser = async (req, res) => {
  //req.body...
  const savedUser = await userModel.create(req.body);
  res.json({
    message: "User Saved Successfully",
    data: savedUser,
  });
};
const getAllUsers = async (req, res) => {
  const users = await userModel.find().populate("roleId");
  res.json({
    message: "User fetched successfully..",
    data: users,
  });
};

const getUserById = async (req, res) => {
  const foundUser = await userModel.findById(req.params.id);
  res.json({
    message: "user fetched successfully..",
    data: foundUser,
  });
};

const deleteUserById = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "user deleted Successfully..",
    data: deletedUser,
  });
};

module.exports = {
  addUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  signup,
  loginUser,
};

//addUser
//getUser
//deleteUser
//getUserById

//exports
