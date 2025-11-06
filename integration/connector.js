import { getintcmdqController } from "./getintegrationcommandq.js";
import {authTokenController} from "./provider/authtoken.js"
import {createuserapiController} from  "./provider/createuserapi.js"
import {callAllapiController} from "./provider/callallapi.js"
export const connectorController = async (integrationData) => {
    try{
        // console.log("🔥 Integration data before connector:", integrationData);
        const getintegrationcommandqData = await getintcmdqController(integrationData);
        // console.log("connector file loaded successfully",getintegrationcommandqData);
        const authTokenData = await authTokenController(getintegrationcommandqData);

        const userapiData = await createuserapiController(integrationData,getintegrationcommandqData);

        const callallapiData = await  callAllapiController(userapiData,authTokenData)
        return {getintegrationcommandqData,authTokenData,userapiData,callallapiData};
        }
    catch(err){
           return { success: false, error: err.message };
    }
}