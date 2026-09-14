const User = require("../models/users")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()

const createUser = async (req, res) => {
    const { username, password, email, role } = req.body

    if (!username || !password || !email || !role) {
        return res.status(400).json({ message: "username, password, email and role are required" })
    }

    try {
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name: username, password: passwordHash, email, role })

        return res.status(201).json({ user: newUser })
    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ message: "email already registered" })
        return res.status(500).json({ message: err.message })
    }
}

const acessUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "email and password are required" })
    }

    if (!process.env.AcessToken) {
        return res.status(500).json({ message: "JWT secret is not configured" })
    }

    try {
        const foundUser = await User.findOne({ email })

        if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
            return res.status(401).json({ message: "invalid credentials" })
        }

        const accessToken = jwt.sign(
            { name: foundUser.name, role: foundUser.role },
            process.env.AcessToken,
            { expiresIn: "20m" }
        )

        return res.status(200).json({ token: accessToken })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteUser = async (req, res) => {
    const { email } = req.body

    if (!email) return res.status(400).json({ message: "email is required" })

    try {
        const deletedUser = await User.findOneAndDelete({ email })

        if (!deletedUser) return res.status(404).json({ message: "user not found" })

        return res.status(200).json({ message: "user deleted" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const updateUser = async (req, res) => {
    const { email, changeName, changePwd } = req.body

    if (!email) return res.status(400).json({ message: "email is required" })
    if (changeName === undefined && changePwd === undefined) {
        return res.status(400).json({ message: "no data to update" })
    }

    const changes = {}
    if (changeName !== undefined) changes.name = changeName

    try {
        if (changePwd !== undefined) {
            changes.password = await bcrypt.hash(changePwd, 10)
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: changes },
            { new: true, runValidators: true }
        )

        if (!updatedUser) return res.status(404).json({ message: "user not found" })

        return res.status(200).json({ user: updatedUser })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = { updateUser, deleteUser, acessUser, createUser }
