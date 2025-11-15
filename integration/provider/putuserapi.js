import { authTokenController } from "./authtoken.js";
import { callAllapiController } from "./callallapi.js";

export const putUserApiController = async (integrationData, getintCmdqData) => {
    try {
        if (!getintCmdqData?.API) {
            throw new Error("Missing API details in 'getintegrationcommandqData'deleteuserapi");
        }
        const { jsonpara } = integrationData;
        const { id } = jsonpara;
        console.log(id);

        const { API } = getintCmdqData;

        const ApiUrl = API?.url;
        const Method = API?.method;
        if (!ApiUrl || !Method) {
            throw new Error("API URL or Method is missing in integration command data");
        }
        const { Token, success, error } = await authTokenController(getintCmdqData);
        if (success === false || !Token) {
            throw new Error(error || "Failed to retrieve auth token");
        }
        const finalUrl = ApiUrl.replace("<<put>>", id);
        // console.log("API URL BEFORE REPLACE:", ApiUrl);
        // console.log("API URL AFTER REPLACE:", finalUrl);
        // console.log("METHOD:", Method);
        const userData = {
            ApiUrl: finalUrl,
            Method,
            Token
        }

        const callallapiData = await callAllapiController(userData);
        console.log("Check api success or fail", callallapiData.status);
        return {
            success: true,
            userData,
            Response: callallapiData.data,
            status: callallapiData.status
        }
    }
    catch (err) {
        return { success: false, error: err.message }
    }
}