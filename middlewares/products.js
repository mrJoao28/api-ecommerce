const checkUser = (req,res,next)=>{
    const role = req.user.role
    if (!role) return res.sendStatus(401)

    if ( role === "adm") next()
    
    else {
        return "nao permitido"
    }

}

module.exports  = checkUser