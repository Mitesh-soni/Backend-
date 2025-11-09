import mongoose from "mongoose"
import { authTokenController } from "./authtoken.js";
export const createuserapiController = async (integrationData, getintegrationcommandqData) => {
    try {
        if (!getintegrationcommandqData?.API) {
            throw new Error("Missing API details in 'getintegrationcommandqData'");
        }
        const Data = integrationData.jsonpara;

        const { API } = getintegrationcommandqData;

        const ApiUrl = getintegrationcommandqData.API?.url;
        const Method = getintegrationcommandqData.API?.method || "POST";

        if (!ApiUrl) {
            throw new Error("API URL is missing in integration command data");
        }
        const { Token, success, error } = await authTokenController(integrationData);

        if (success === false || !Token) {
            throw new Error(error || "Failed to retrieve auth token");
        }
        return {
            success: true,
            Token,
            ApiUrl,
            Method,
            Data
        }
    }
    catch (err) {
        return{success: false,error: err.message}
    }
}