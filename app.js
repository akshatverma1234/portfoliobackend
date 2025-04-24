const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const Contact = require("./models/Contact")

const coreOption = {
  origin: "https://myportfolio-djhuw6k5f-akshatverma1234s-projects.vercel.app/",
  optionsSuccessStatus: 200,
}

const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Error:", err))

app.post("/api/contact", cors(coreOption), async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." })
  }

  try {
    const contact = new Contact({ name, email, message })
    await contact.save()

    res
      .status(200)
      .json({ success: true, message: "Message stored successfully." })
    console.log("Messege Stored Successfully")
  } catch (err) {
    console.error("Error saving contact:", err)
    res.status(500).json({ error: "Internal server error." })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
