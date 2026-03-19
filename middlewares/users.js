const jwt = require("jsonwebtoken")

require("dotenv").config()

const verify = async (req,res,next)=>{
    const header = req.headers.authorization
  
    if (!header) return res.sendStatus(400)
    const token = header.split(" ")[1]
    try{
    jwt.verify(token , process.env.AcessToken,
        (err,user)=>{
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        }
    )
    }catch(err){
        return res.status(500).json({"message":err.message})
    }
    
}


const verify_adm = (req,res,next)=>{
    const role = req.user.role 
    if (!role) return res.sendStatus(401)
    if (role !== "adm") return res.sendStatus(402)
    else next()
}

module.exports = {verify , verify_adm}
