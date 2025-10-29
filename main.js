const express = require('express')
const { default: mongoose } = require('mongoose')
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

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})