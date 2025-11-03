import mongoose from "mongoose";
import intcmdq from "./intcmdqt";

// Create a small counter collection schema
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
});

// Model for counters
const Counter = mongoose.model("Counter", counterSchema);

// Your main schema
const log1Schema = new mongoose.Schema({
    trno: { type: Number, unique: true },
    commandId: { type: Number },
    providerId: { type: Number },
    jsonpara: {},
});

// Auto-increment before saving
intcmdq.pre("save", async function (next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: "trno" },          // name of your sequence
            { $inc: { seq: 1 } },     // increment by 1
            { new: true, upsert: true }
        );
        this.trno = counter.seq;     // assign the new number
    }
    next();
});

const intcmdq = mongoose.model("intcmdq", intcmdq);
export default intcmdq;