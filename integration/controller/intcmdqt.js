import intcmdqt from "../models/intcmdqt.js";

export const intcmdqtControler = async (integrationData, intcmdqdata) => {
    try {
        const { commandId, providerId, status, jsonpara: empdata } = integrationData;
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', { hour12: true }); 
        const newintcmdqt = new intcmdqt({ trno: intcmdqdata.trno, commandId, providerId, status, jsonpara: empdata, time: timeString });
        const intcmdqtData = await newintcmdqt.save();
        console.log(trno);
        return {
            success: true,
            intcmdqt: intcmdqtData,
        }
    }
    catch (err) {
        return { success: false, error: err.message };
    }
}