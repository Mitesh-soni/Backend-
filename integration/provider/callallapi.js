import axios from "axios"
import intcmdqt from "../models/intcmdqt.js";
import { intcmdqtControler } from "../controller/intcmdqt.js";
import { now } from "mongoose";
export const callAllapiController = async (createuserapiData,intCmdqdata) => {
  try {
    const { Data, ApiUrl, Method, Token } = await createuserapiData;
    const response = await axios({
      method: Method,
      url: ApiUrl,
      data: Data,
      headers: {
        Authorization: `Bearer ${Token}`
      }
    })
    const {trno,providerId,commandId}= await intCmdqdata
    console.log(trno);
    const updatedData={
          trno,
          providerId,
          commandId,
          status:+1,
          jsonpara:Data
    }
   const savedata= await intcmdqtControler(updatedData);
   console.log(savedata); 
    return {
      success: true,
      data: response.data
    };
  }
  catch (err) {
    return { success: false, error: err.message };
  }
}