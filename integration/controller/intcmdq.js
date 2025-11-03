import intcmdq from "../models/intcmdq.js";

export const intcmdq = async (req, res) => {
    try{
        const response = req.body;
        const newintcmdq = new intcmdq(response);
        const intcmdqData = await newEmp.save();
        res.status(201).json({
            intcmdq : intcmdqData
        });
    }
    catch(err){
           res.json(err);
    }
}