const Products = require("../models/products")



const creatProduct = async (req,res)=>{
    const nameProduct = req.body.name
    const descriptionProduct = req.body.description
    const priceProduct = req.body.price
    const category = req.body.category
    if (!nameProduct || !descriptionProduct || !priceProduct || !category) return res.sendStatus(402)
    
    try {

        const newProduct = await Products.create({"product-name":nameProduct,
                                            "description":descriptionProduct,
                                            "price":priceProduct,
                                            "category":category})

        return res.sendStatus(200).json({"product":newProduct})

    } catch(err){

        return res.sendStatus(500).json({"message":err.message})

    }
}

const showProduct = async (req,res)=>{
    const productId = req.params.id
    if (!productsId) return res.sendStatus(402)

    try {
        const foundProduct = await Products.findOne({"_id":productId})
        if (!foundProduct) return res.sendStatus(404)
        return res.sendStatus(200).json({"product":foundProduct})
    }catch(err){
        return res.sendStatus(500).json({"message":err.message})
    }
}

const showAllProducts = async (req,res)=>{
    try {
        const allProducts = await Products.find({})

        if (!allProducts) return res.sendStatus(404).json({"message":"no products"})

        return res.sendStatus(200).json({"products":allProducts})
    } catch(err){
        return res.sendStatus(500).json({"message":err.message})
    }
}

const deleteProduct = async (req,res)=>{
    const productId = req.params.id
    if (!productsId) return res.sendStatus(402)

    try {
        const foundProduct = await Products.findOneAndDelete({"_id":productId})
        if (!foundProduct) return res.sendStatus(404)
        return res.sendStatus(200).json({"message":"product deleted"})
    }catch(err){
        return res.sendStatus(500).json({"message":err.message})
    }
}


const updateProduct = async (req,res)=>{
    const productId = req.params.id
    const nameChange = req.body.name
    const priceChange = req.body.price
    const descriptionChange = req.body.description
    const categoryChange = req.body.category

    if (!productId) return res.sendStatus(402)

    let changes = {}
    if (nameChange){
        changes["product-name"] = nameChange
    }
    if (priceChange){
        changes["price"] = priceChange
    }
    if (descriptionChange){
        changes["description"] = descriptionChange
    }
    if (categoryChange){
        changes["category"] = categoryChange
    }

    if (changes.length === 0){
        return res.sendStatus(200).json({"message":"nenhum dado para atualizar"})
    }

    


    try {
        const foundProduct = await Products.findOneAndUpdate({"_id":productId},{$set:changes})
        if (!foundProduct) return res.sendStatus(404)
        return res.sendStatus(200).json({"message":"product deleted"})
    }catch(err){
        return res.sendStatus(500).json({"message":err.message})
    }
}


module.exports = {updateProduct,deleteProduct,showAllProducts,showProduct,creatProduct}