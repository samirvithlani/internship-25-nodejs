const express = require("express") //express....
const mongoose = require("mongoose")
const cors = require("cors")
//express object..
const app = express()
app.use(cors()) // *
app.use(express.json()) //to accept data as json...


//import role routes
const roleRoutes = require("./src/routes/RoleRoutes")
app.use(roleRoutes)

//userRoutes
const userRoutes = require("./src/routes/UserRoutes")
app.use(userRoutes)



mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(()=>{
    console.log("database connected....")
})


//server creation...
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server started on port number ",PORT)
})
