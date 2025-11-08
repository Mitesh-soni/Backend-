import axios from "axios"
import intcmdqt from "../models/intcmdqt.js";
import { intcmdqtControler } from "../controller/intcmdqt.js";
export const callAllapiController = async (createuserapiData, integrationData) => {
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
      trno: trno,                         // same transaction number
      status: status + 2,                 // ✅ success → +3
      jsonpara: Data,                     // request data
      responseData: response?.data || {}, // API response data
      createdAt: new Date(),
    });

    // 3️⃣ Save record
    const savedData = await newRecord.save();

    console.log("✅ Success stored in intcmdqt:", savedData);


    return {
      success: true,
      data: response.data
    };
  }
  catch (err) {
const { trno, status } = integrationData;

    // 4️⃣ Prepare record for failed response
    const failedRecord = new intcmdqt({
      trno: trno,                          // same transaction number
      status: status + 4,                  // ❌ fail → +4
      jsonpara: createuserapiData.Data,    // request data
      responseData: { error: err.message },// store error message
      createdAt: new Date(),
    });

    await failedRecord.save();
    return { success: false, error: err.message };
  }
}