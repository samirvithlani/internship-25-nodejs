//router
const routes = require("express").Router()
//controller --> userController
const userController = require("../controllers/UserController")
const authMiddleware = require("../middleware/AuthMiddleware")


//routes.post("/user",userController.addUser)
routes.post("/user",userController.signup)
routes.get("/users",authMiddleware.authMiddleware,userController.getAllUsers)
routes.get("/user/:id",userController.getUserById)
routes.delete("/user/:id",userController.deleteUserById)
//routes.post("/user/login",userController.loginUser)
routes.post("/user/login",userController.loginuserWithToken)
routes.post("/user/forgotpassword",userController.forgotPassword)
routes.post("/user/resetpassword",userController.resetpassword)
//get
//post
//delete
//get

module.exports = routes