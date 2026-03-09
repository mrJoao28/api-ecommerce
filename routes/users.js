const express = require("express")
const router = express.Router()
const {updateUser , deleteUser , acessUser , createUser  } = require("../controllersqusers")


/*
post new_user
get user
delete user
patch user 
*/

router.post("/new-user",createUser)
router.get("/user",acessUser)
router.delete("/user/:id",deleteUser)
router.patch("/user/:id",updateUser)

