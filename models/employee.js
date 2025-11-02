import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mno: {
        type: Number,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        require: true
    },

})

const emp = mongoose.model('employee', employeeSchema);
export default emp;