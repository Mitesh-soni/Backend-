import axios from "axios"
import intcmdqt from "../models/intcmdqt.js";
import { intcmdqtControler } from "../controller/intcmdqt.js";
export const callAllapiController = async (createuserapiData) => {
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
    
    const newRecord = new intcmdqt({
      trno: trno,                         
      status: status + 2,                 
      jsonpara: Data,                     
      responseData: response?.data || {}, 
      createdAt: new Date(),
    });

    // 3️⃣ Save record
    const savedData = await newRecord.save();


    return {
      success: true,
      data: response.data
    };
  }
  catch (err) {
const { trno, status } = integrationData;

    const failedRecord = new intcmdqt({
      trno: trno,                          
      status: status + 4,                 
      jsonpara: createuserapiData.Data,    
      responseData: { error: err.message },
      createdAt: new Date(),
    });

    await failedRecord.save();
    return { success: false, error: err.message };
  }
}