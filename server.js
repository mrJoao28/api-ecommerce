const express = require("express")
const connect = require("./db/connect")
require("dotenv").config()

const PORT = Number(process.env.PORT) || 3000
const app = express()

app.use(express.json({ limit: "1mb" }))

app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" })
})

app.use("/ecommerce", require("./routes/users"))
app.use("/ecommerce", require("./routes/products"))

const start = async () => {
    const databaseUrl = process.env.URL

    if (!databaseUrl) {
        throw new Error("URL environment variable is not set")
    }

    await connect(databaseUrl)

    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`)
    })
}

start().catch((error) => {
    console.error("Failed to start server:", error.message)
    process.exit(1)
})
