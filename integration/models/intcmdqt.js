import { json } from "express";
import mongoose from "mongoose";

const log2Schema = new mongoose.Schema({
    trno: {
        type: Number
    },
    commandId: {
        type: Number
    },
    providerId: {
        type: Number
    },
    status: {
        type: String
    },
    jsonpara: {
        type: Object
    },
    time: {
        type: String
    }

})

const intcmdqt = mongoose.model('intcmdqt', log2Schema);
export default intcmdqt;