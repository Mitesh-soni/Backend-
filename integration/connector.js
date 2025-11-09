import { getintcmdqController } from "./getintegrationcommandq.js";
import { createuserapiController } from "./provider/createuserapi.js"
import { callAllapiController } from "./provider/callallapi.js"
export const connectorController = async (integrationData,intCmdqdata) => {
    try {
        if (!integrationData || !integrationData.providerId || !integrationData.commandProviderLinkId) {
            throw new Error("Invalid or missing integration data");
        }
        // Step 1: Fetch integrationcommandqueue data
        const intCmdqData = await getintcmdqController(integrationData);
        if (!intCmdqData) throw new Error("No integration command queue data found");

        // Step 2: Create user via API
        const userApiData = await createuserapiController(integrationData, intCmdqData);
        if (!userApiData) throw new Error("User API creation failed");

        // Step 3: Here calling all API
        const allApiData = await callAllapiController(userApiData,intCmdqdata);

        return {
            intCmdqData,
            userApiData,
            allApiData
        };
    }
    catch (err) {
        return { success: false, error: err.message };
    }
}   