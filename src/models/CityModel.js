const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({

    name:{
        type: String,
        required: true,
        unique: true
    },
    stateId:{
        type:Schema.Types.ObjectId,
        ref:"State",
    }
},{
    timestamps: true
})
module.exports = mongoose.model('City', citySchema);