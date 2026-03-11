const mongoose = require("mongoose")


const Products = mongoose.Schema({
    "product-name":{
        type :String,
        required:true
    },
    "description":{
        type : String,
        required : true
    },
    "price":{
        type : Number,
        required : true
    },
})


module.exports = mongoose.model("Products",Products)
