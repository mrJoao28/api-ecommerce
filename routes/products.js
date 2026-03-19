const express = require("express")
const router = express.Router()
const {updateProduct,deleteProduct,showAllProducts,showProduct,creatProduct} = require("../controllers/products")
const verify = require("../middlewares/users")
const checkUser = require("../middlewares/products")


router.get("/products",verify,showAllProducts)
router.get("/products/:id",verify,showProduct)
router.post("/create-product",checkUser,verify,creatProduct)
router.patch("/update-product",checkUser,verify,updateProduct)
router.delete("/delete-product",checkUser,verify,deleteProduct)



module.exports = router 