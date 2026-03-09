const mongoose = require("mongoose")


const User = mongoose.Schema({
    "name":{
        type:String,
        required:true,
        maxlength:[20,"The max length is 20 characters"]
    },
    "password":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true,
        unique:true
    },
    "role":{
        type:String,
        required:true
    }
})


module.exports = mongoose.model("User" , User)
