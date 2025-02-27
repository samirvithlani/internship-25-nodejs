//router
const routes = require("express").Router()
//controller --> userController
const userController = require("../controllers/UserController")
//routes.post("/user",userController.addUser)
routes.post("/user",userController.addUser1)
routes.get("/users",userController.getAllUsers)
routes.get("/user/:id",userController.getUserById)
routes.delete("/user/:id",userController.deleteUserById)
//get
//post
//delete
//get

module.exports = routes