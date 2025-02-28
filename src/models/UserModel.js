const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({

    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    age:{
        type:Number
    },
    status:{
        type:Boolean
    },
    roleId:{
        type:Schema.Types.ObjectId, //batugasoijkadsasiksaj
        ref:"roles"
    },
    password:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    }

})

module.exports = mongoose.model("users",userSchema)