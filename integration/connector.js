import { getintcmdqController } from "./getintegrationcommandq.js";
import { createuserapiController } from "./provider/createuserapi.js";
import { intcmdqtControler } from "./controller/intcmdqt.js";
import { deleteUserApiController } from "./provider/deleteuserapi.js";
import { getUserApiController } from "./provider/getuserapi.js"
import { putUserApiController } from "./provider/putuserapi.js";

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
        let getApiData;
        let putApiData;

        if (method === "POST") {
            userApiData = await createuserapiController(integrationData, getintCmdqData);
            if (!userApiData) throw new Error("User API creation failed");
        }
        else if (method === "GET") {
            getApiData = await getUserApiController(integrationData, getintCmdqData);
            if (!getApiData) throw new Error("User API get failed")
        }
        else if (method === "PUT") {
            putApiData = await putUserApiController(integrationData, getintCmdqData);
            if (!putApiData) throw new Error("User API get failed")
        }
        else if (method === "DELETE") {
            deleteuserApiData = await deleteUserApiController(integrationData, getintCmdqData);
            if (!deleteuserApiData) throw new Error("User API delete failed");
        }
        const responseApiData = userApiData || deleteuserApiData || getApiData || putApiData;
        const status = responseApiData.status;
        const responseData = responseApiData.Response;

        // console.log(checkStatus);
        if (status === 200 || status === 201) {
            const apiSuccessData = {
                trno: trno,
                commandId,
                providerId,
                status: 3,
                jsonpara: { ...jsonData, ...responseData }
            }
            await intcmdqtControler(apiSuccessData);
        } else {
            const apiFailData = {
                trno: trno,
                commandId,
                providerId,
                status: 4,
                jsonpara: { ...jsonData, ...responseData }
            }
            await intcmdqtControler(apiFailData);
        }

        return {
            getintCmdqData,
            userApiData,
            deleteuserApiData,
            responseApiData
        };
    }
    catch (err) {
        return { success: false, error: err.message };
    }
}