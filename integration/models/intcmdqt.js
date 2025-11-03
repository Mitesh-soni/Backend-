import { json } from "express";
import mongoose from "mongoose";

const log1Schema = new mongoose.Schema({
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
        type
    },
    jsonpara: {

    },
    time: {
        type: Number
    }

})

const intcmdq = mongoose.model('intcmdqt', log1Schema);
export default intcmdq;