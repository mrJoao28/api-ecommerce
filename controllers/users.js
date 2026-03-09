const express = require("express")
const User = require("../models/users")

const createUser = async (req,res) =>{
    const username = req.body.username
    const pwd = req.body.password
    const email = req.body.email
    const role = req.body.role

    if (!username || !pwd || !email || !role) return res.status(401)
    
    try {
        const pwdHash = await bcrypt.hash(pwd,10)
        const newUser = await User.create({"name":username,"password":pwdHash,"email":email,"role":role})
        return res.status(200).json({"message":newUser})
    } catch (err){
        return res.status(500).json({"message":err.message})
    }
}

