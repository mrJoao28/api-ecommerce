const Products = require("../models/products")

const createProduct = async (req, res) => {
    const { name, description, price, category } = req.body

    if (!name || !description || price === undefined || !category) {
        return res.status(400).json({ message: "name, description, price and category are required" })
    }

    try {
        const newProduct = await Products.create({
            "product-name": name,
            description,
            price,
            category,
        })

        return res.status(201).json({ product: newProduct })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const showProduct = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: "product id is required" })

    try {
        const product = await Products.findById(id)

        if (!product) return res.status(404).json({ message: "product not found" })

        return res.status(200).json({ product })
    } catch (err) {
        return res.status(400).json({ message: "invalid product id" })
    }
}

const showAllProducts = async (_req, res) => {
    try {
        const products = await Products.find({})
        return res.status(200).json({ products })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!id) return res.status(400).json({ message: "product id is required" })

    try {
        const product = await Products.findByIdAndDelete(id)

        if (!product) return res.status(404).json({ message: "product not found" })

        return res.status(200).json({ message: "product deleted" })
    } catch (err) {
        return res.status(400).json({ message: "invalid product id" })
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params
    const { name, price, description, category } = req.body

    if (!id) return res.status(400).json({ message: "product id is required" })

    const changes = {}
    if (name !== undefined) changes["product-name"] = name
    if (price !== undefined) changes.price = price
    if (description !== undefined) changes.description = description
    if (category !== undefined) changes.category = category

    if (Object.keys(changes).length === 0) {
        return res.status(400).json({ message: "no data to update" })
    }

    try {
        const product = await Products.findByIdAndUpdate(
            id,
            { $set: changes },
            { new: true, runValidators: true }
        )

        if (!product) return res.status(404).json({ message: "product not found" })

        return res.status(200).json({ product })
    } catch (err) {
        return res.status(400).json({ message: "invalid product data" })
    }
}

module.exports = {
    updateProduct,
    deleteProduct,
    showAllProducts,
    showProduct,
    createProduct,
    creatProduct: createProduct,
}
