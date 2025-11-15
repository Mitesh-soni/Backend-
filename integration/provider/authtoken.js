import axios from "axios";
import { getintcmdqController } from "../getintegrationcommandq.js"

export const authTokenController = async (getintCmdqData) => {
  try {
    if (!getintCmdqData) {
      throw new Error("Missing integrationData in authTokenController");
    }

    const { token, url } = getintCmdqData.authToken;

    if (!url) {
      throw new Error("Auth URL is missing in authToken");
    }
    // console.log(url);

    //fetch token 
    const response = await axios({
      method: "GET",
      url,
      headers: {
        Authorization: `Bearer ${token || ""}`
      }
    })

    if (!response?.data?.token) {
      throw new Error("No token received in authentication response");
    }

    //store only token in authTokenData
    const authTokenData = response.data.token;

    return {
      success: true,
      Token: authTokenData
    }
  } catch (err) {
    console.error("Error in authTokenController:", err.message);
    return { success: false, error: err.message };
  }
};