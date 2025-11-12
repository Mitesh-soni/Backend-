import intcmdq from "../models/intcmdq.js";

export const intcmdqController = async (integrationData) => {
    try{
        const {jsonpara,commandId,providerId} = integrationData;
        const newintcmdq = new intcmdq({commandId,providerId,jsonpara});
        const intcmdqData = await newintcmdq.save();
        // console.log(empdata,"empdata");
        console.log("log created succesfully")
        return {
            success: true,
            trno: intcmdqData.trno,
            data: intcmdqData
        };
    }
    catch(err){
           return { success: false, error: err.message };
    }
}