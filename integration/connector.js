import { getintcmdqController } from "./getintegrationcommandq.js";
import { createuserapiController } from "./provider/createuserapi.js";
import { intcmdqtControler } from "./controller/intcmdqt.js";
import { deleteUserApiController } from "./provider/deleteuserapi.js";
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
        const { commandId, providerId, jsonpara } = intcmdqdata.data || {};
        // console.log(trno, "trno");
        // console.log(empdata,"empData");
        const apiHitData = {
            trno: trno,
            commandId,
            providerId,
            status: 2,
            jsonpara: { ...jsonData, ...jsonpara }
        }
        await intcmdqtControler(apiHitData)

        let userApiData;
        let deleteuserApiData;

        if (method === "POST" && commandId === 1) {
            userApiData = await createuserapiController(integrationData, getintCmdqData);
        }
        else if(method === "DELETE" && commandId === 4)
        deleteuserApiData = await deleteUserApiController(integrationData, getintCmdqData)

        const responseApiData = userApiData|| deleteuserApiData

        const checkStatus = responseApiData.success;
        const responseData = responseApiData.Response;
        if (!userApiData) throw new Error("User API creation failed");
        console.log(checkStatus);
        if (checkStatus === true) {
            const finalData = {
                trno,
                commandId,
                providerId,
                status: 3,
                jsonpara: { ...jsonData, ...responseData}
            };
            await intcmdqtControler(finalData);
        }
        else {
            const finalData = {
                trno,
                commandId,
                providerId,
                status: 4,
                jsonpara: { ...jsonData, ...responseData }
            };
            await intcmdqtControler(finalData);
        }

        return {
            getintCmdqData,
            userApiData,
        };
    }
    catch (err) {
        return { success: false, error: err.message };
    }
}