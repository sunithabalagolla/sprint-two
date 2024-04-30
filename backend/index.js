const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const userModel = require("./models/usermodel");

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 2000



app.get("/", async (req, res) => {
    const data = await userModel.find({})
    res.json({ success: true, data: data })
})


app.post("/create", async (req, res) => {
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({ success: true, message: "data saved" })
})


app.put("/update", async (req, res) => {
    console.log(req.body)
    const { _id, ...rest } = req.body
    const data = await userModel.updateOne({ _id: _id }, rest)
    res.send({ success: true, message: "data updated successfully", data: data })
})


app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    console.log(id);
    const data = await userModel.deleteOne({ _id: id })
    res.send({ success: true, message: "data deleted successfully", data: data })
})
// mongoose.connect("mongodb+srv://sunithabalagolla:sunithabalagolla@cluster0.kprr1fh.mongodb.net/CRUD?retryWrites=true&w=majority&appName=Cluster0")
mongoose.connect("mongodb+srv://sunithabalagolla:sunithabalagolla@cluster0.4rqyddz.mongodb.net/CRUD?retryWrites=true&w=majority&appName=Cluster0")

.then(() => {
        console.log("Connected to Db");
        app.listen(PORT, () => console.log("Server is Running"))
    })

    .catch((err) => console.log(err))

    // mongodb+srv://sunithabalagolla:sunithabalagolla@cluster0.4rqyddz.mongodb.net/

  