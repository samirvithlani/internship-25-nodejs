const routes = require("express").Router()
const roleController= require("../controllers/RoleController")
routes.get("/roles",roleController.getAllRoles)
//v-imp
module.exports = routes