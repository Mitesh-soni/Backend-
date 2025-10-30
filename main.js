import express from "express"
import mongoose from "mongoose"

import createUser from "./route/user.route.js"
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

app.use("/",createUser);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})