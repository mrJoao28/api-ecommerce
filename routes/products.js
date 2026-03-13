const express = require("express")
const router = express.Router()
const {updateProduct,deleteProduct,showAllProducts,showProduct,creatProduct} = require("../controllers/products")
const verify = require("../middlewares/users")


router.get("/products",verify,showAllProducts)
router.get("/products/:id",verify,showProduct)
router.post("/create-product",verify,creatProduct)
router.patch("/update-product",verify,updateProduct)
router.delete("/delete-product",verify,deleteProduct)

module.exports = router 