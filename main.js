import express from "express"
import mongoose from "mongoose"
import User from "./models/user.js"

const app = express()
const port = 3000
app.use(express.json());
async function condb() {
    try {
        mongoose.connect("mongodb://localhost:27017/Employee")
        console.log("connected sucessfully")
    } catch (err) {
        console.log(err)
    }
}
condb();

app.get('/',(req,res)=>{
    res.send("server start")
})

app.post('/user', async (req, res) => {
    const userdata = req.body
    const user =new User(userdata);
    const savedata = await user.save();
    res.status(201).json(savedata);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})