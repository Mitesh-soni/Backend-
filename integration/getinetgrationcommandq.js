import { response } from "express";
import intcmdq from "../models/intcmdq.js";

export const getintegrationcommandq = async (req, res) => {
    try{
        const {commandId} = req.body;
        const getintegrationcommandqData = await getintegrationcommandq.findOne(response);
        res.status(201).json({
            DataTransfer : getintegrationcommandqData
    })
}
    catch(err){
           res.json(err);   
    }
}