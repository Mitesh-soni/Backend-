import mongoose, { mongo } from "mongoose";

export const getintcmdqController = async (integrationData) => {
    try {
        const { commandProviderLinkId, providerId } = integrationData;

        if (!commandProviderLinkId || !providerId) {
            throw new Error("Missing commandProviderLinkId or providerId");
        }

        const result = await mongoose.connection.collection("icommandproviderlink").findOne({
            commandProviderLinkId,
            providerId
        });

        if (!result) {
            return { success: false, error: err.message };
        }

        const { jsonPara: url } = result;
        
        //Find authTokenData in iprovider collection where providerId 
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