const express = require("express")
const router = express.Router()
const {updateUser , deleteUser , acessUser , createUser  } = require("../controllersqusers")
const verify = require("../middlewares/users")

/*
post new_user
get user
delete user
patch user 
*/

router.post("/new-user",createUser)
router.get("/user",acessUser)
router.delete("/user/:id",verify,deleteUser)
router.patch("/user/:id",verify,updateUser)

module.exports = router