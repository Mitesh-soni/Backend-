import mongoose from "mongoose";

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
  jsonpara: { type: mongoose.Schema.Types.Mixed },
});

// Auto-increment before saving
log1Schema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "trno" },          // name of your sequence
      { $inc: { seq: 1 } },     // increment by 1
      { new: true, upsert: true }
    );
    this.trno = counter.seq;     // assign the new number
  }
  next();
  console.log("Creating intcmdq with trno:", newTrno, "at", new Date().toISOString());
});

const intcmdq = mongoose.model("intcmdq", log1Schema);
export default intcmdq;