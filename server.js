const express = require("express")
const connect = require("./db/connect")
require("dotenv").config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use("/ecommerce", require("./routes/users"))




const start = async ()=>{
    await connect(process.env.URL)
    app.listen(PORT ,()=>{
        console.log(`The server is running on  ${PORT} port`)
    })
}

start()
