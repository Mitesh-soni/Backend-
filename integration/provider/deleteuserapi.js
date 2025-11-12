import { authTokenController } from "./authtoken.js";
import { callAllapiController } from "./callallapi.js";

export const deleteUserApiController = async (integrationData, getintCmdqData) => {
    try {
        if (!getintCmdqData?.API) {
            throw new Error("Missing API details in 'getintegrationcommandqData'");
        }
        const Data = integrationData.jsonpara;

        const { API } = getintCmdqData;
        // console.log(API);

        const ApiUrl = API?.url;
        const Method = API?.method;
        if (!ApiUrl || !Method) {
            throw new Error("API URL or Method is missing in integration command data");
        }
        const finalurl = ApiUrl
        if(Method==="DELETE"&& Data){
            const key = object.keys[0];
            console.log(key)
            const value = object.value[0];
            console.log(value)
            finalurl =`${ApiUrl}/${key}/${value}`
        }

        const { Token, success, error } = await authTokenController(getintCmdqData);
        if (success === false || !Token) {
            throw new Error(error || "Failed to retrieve auth token");
        }

        const userData = {
            ApiUrl:finalurl,
            Method,
            Token
        }

        const callallapiData = await callAllapiController(userData);
        console.log("Check api success or fail", callallapiData);
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