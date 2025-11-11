import { getintcmdqController } from "./getintegrationcommandq.js";
import { createuserapiController } from "./provider/createuserapi.js";
import { intcmdqtControler } from "./controller/intcmdqt.js";
export const connectorController = async (integrationData, intcmdqdata, trno) => {
    try {
        //validation
        if (!integrationData || !integrationData.providerId || !integrationData.commandProviderLinkId) {
            throw new Error("Invalid or missing integration data");
        }

        // Step 1: Fetch integrationcommandqueue data
        const getintCmdqData = await getintcmdqController(integrationData);

        if (!getintCmdqData) throw new Error("No integration command queue data found");
        
        // Extract API details
        const { API } = getintCmdqData;
        const url = API?.url
        const method = API?.method

        //validation 
        if (!url || !method) throw new Error("Missing API URL or method");

        const jsonData = {
            url,
            method
        }
        const { commandId, providerId, jsonpara: empdata } = intcmdqdata.data || {};
        // console.log(trno, "trno");
        // console.log(empdata,"empData");
        const apiHitData = {
            trno: trno,
            commandId,
            providerId,
            status: 2,
            jsonpara: { ...jsonData,...empdata }
        }
        await intcmdqtControler(apiHitData)

        // Step 2: Create user via API
        const userApiData = await createuserapiController(integrationData, getintCmdqData);
        if (!userApiData) throw new Error("User API creation failed");
        const isSuccess = userApiData.status === 201 || userApiData.status === 200;
        const finalData = {
            trno,
            commandId,
            providerId,
            status: isSuccess ? 3 : 4,
            jsonpara: { ...jsonData, ...userApiData.Response }
        };
        await intcmdqtControler(finalData);

        return {
            getintCmdqData,
            userApiData,
        };
    }
    catch (err) {
        return { success: false, error: err.message };
    }
}