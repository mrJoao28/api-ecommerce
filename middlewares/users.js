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


module.exports = verify