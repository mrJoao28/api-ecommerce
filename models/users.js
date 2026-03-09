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
        match:["^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"]
    },
    "role":{
        type:String,
        match:["^(user|adm)$","this must be user or adm"]
    }
})


module.exports = mongoose.model("User" , User)
