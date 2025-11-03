import intcmdqt from "../models/intcmdqt.js";

export const intcmdqt = async(req, res) => {
    try{
         const response = req.body;
        const newintcmdqt = new intcmdqt(response);
        const intcmdqtData = await newintcmdqt.save();
        res.status(201).json({
            intcmdq : intcmdqtData
        });
    }
    catch(err){
res.json(err)
    }
}