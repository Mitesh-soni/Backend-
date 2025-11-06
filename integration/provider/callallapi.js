import axios from "axios"
// import intcmdqt from "../models/intcmdqt";

export const callAllapiController = async (userapiData,authTokenData)=>{
    try{
      const {userdata,url,Method}=userapiData;
      const {authToken:token}=authTokenData;
        const response = await axios({
            method:Method,
            url:url,
            data:userdata,
            headers:{
                Authorization: `Bearer${token}`
            }
        })
      return {
      success: true,
      data: response.data
    };
    }
    catch(err){
         return { success: false, error: err.message };
    }
}