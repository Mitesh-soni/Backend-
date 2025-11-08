import { getintcmdqController } from "./getintegrationcommandq.js";
import {authTokenController} from "./provider/authtoken.js"
import {createuserapiController} from  "./provider/createuserapi.js"
import {callAllapiController} from "./provider/callallapi.js"
export const connectorController = async (integrationData) => {
    try{

        // console.log("🔥 Integration data before connector:", integrationData);
        const getintegrationcommandqData = await getintcmdqController(integrationData);
        // console.log("connector file loaded successfully",getintegrationcommandqData);
        const authTokenData = await authTokenController(getintegrationcommandqData)
        const createuserapiData = await createuserapiController(integrationData,getintegrationcommandqData,authTokenData);

        const callallapiData = await  callAllapiController(createuserapiData,integrationData)
        return {getintegrationcommandqData,authTokenData,createuserapiData,callallapiData};
        }
    catch(err){
           return { success: false, error: err.message };
    }
}