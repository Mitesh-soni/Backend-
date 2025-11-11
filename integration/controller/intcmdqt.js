import intcmdqt from "../models/intcmdqt.js";
import { connectorController } from "../connector.js";

export const intcmdqtControler = async (sourceData, apiHitData, finalData) => {
    try {
        const currSourceData = apiHitData || finalData || sourceData;
        const now = new Date();
        const currentTIme = now.toLocaleTimeString('en-IN', { hour12: true });
        const { trno, commandId, providerId, status, jsonpara } = currSourceData;
        const newintcmdqt = new intcmdqt({
            trno,
            commandId,
            providerId,
            status,
            jsonpara: jsonpara,
            time: currentTIme
        });
        const intcmdqtData = await newintcmdqt.save();
        return {
            success: true,
            intcmdqt: intcmdqtData,
        }
    }
    catch (err) {
        return { success: false, error: err.message };
    }
}