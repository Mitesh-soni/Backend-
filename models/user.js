import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    }
})

const user = mongoose.model('user', userSchema);
export default user;