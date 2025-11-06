import mongoose, { mongo } from "mongoose";

export const getintcmdqController = async (integrationData) => {
    try {
        // console.log("before:", integrationData);
        const { commandProviderLinkId, providerId } = integrationData;
        const result = await mongoose.connection.collection("icommandproviderlink").findOne({
            commandProviderLinkId,
            providerId
        });

        if (!result) {
            return { success: false, error: err.message };
        }


        const { jsonPara: url } = result;
        // console.log(url,"check url");
        const authTokenData = await mongoose.connection.collection("iprovider").findOne({
            providerId
        })
        if (!authTokenData) {
            return { success: false, error: err.message };
        }

        
        const { jsonPara: authurl } = authTokenData;
        return {
            API: url,
            authToken: authurl
        };
    }
    catch (err) {
        return { success: false, error: err.message };
    }
}