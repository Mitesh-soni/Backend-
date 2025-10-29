import express from "express"
import mongoose from "mongoose"
const app = express()
const port = 3000
async function condb() {
    try {
        mongoose.connect("mongodb://localhost:27017/Employee")
        console.log("connected sucessfully")
    } catch (err) {
        console.log(err)
    }
}
condb();

app.get('/user', (req, res) => {
    res.send('Hello user!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})