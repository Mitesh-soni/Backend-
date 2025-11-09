import intcmdqt from "../models/intcmdqt.js";
import { connectorController } from "../connector.js";

export const intcmdqtControler = async (integrationData, intcmdqdata, updatedData) => {
    try {
        const { commandId, providerId, status, jsonpara: empdata } = integrationData || updatedData;
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-IN', { hour12: true });
        const newintcmdqt = new intcmdqt({ trno: intcmdqdata.trno, commandId, providerId, status, jsonpara: empdata, time: timeString });
        const intcmdqtData = await newintcmdqt.save();
        // console.log(intcmdqdata.trno);
        let conectorData = await connectorController(integrationData);
        return {
            success: true,
            intcmdqt: intcmdqtData,
            conector: conectorData
        }
    }
    catch (err) {
        return { success: false, error: err.message };
    }
}