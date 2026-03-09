const express = require("express")
const User = require("../models/users")
const jwt = require("jsonwebtoken")
require("dotenv").config()

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

const acessUser = async (req,res)=>{
    const email = req.body.email
    const pwd = req.body.password

    if (!email || !pwd) return res.status(401)

    try{
        foundUser = await User.findOne({"email":email})

        if (!foundUser) return res.status(404)

        if (!(await bcrypt.compare(pwd,foundUser.password))) return res.status(402)

        const acessToken = jwt.sign(
            {
                "name":foundUser.name,
                "role":foundUser.role
            },
            process.env.AcessToken,
            {"expiresIn":"20m"}
        )

       return res.status(200).json({"token":acessToken})

    } catch(err){

        return res.status(500).json({"message":err.message})

    }
}