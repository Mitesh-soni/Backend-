import mongoose from "mongoose"
export const createuserapiController = async (integrationData, getintegrationcommandqData,authTokenData) => {
    try {
        const { jsonpara: empdata} = integrationData;
        const Data = empdata;
        const { API } = getintegrationcommandqData;
        const ApiUrl= API.url;
        // console.log(ApiUrl)
        const Method= API.method;
        const { Token } = await authTokenData;
        // console.log(Token,"authToken in createuserapiController");
        return {Token,ApiUrl,Method,Data}
    }
    catch (err){
        console.log(err);

    }
}