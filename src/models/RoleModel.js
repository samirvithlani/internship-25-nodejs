//database 
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    //fileds /// get
})

module.exports = mongoose.model("roles",roleSchema)

//roles[roleSchema]