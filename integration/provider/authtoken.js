import axios from "axios";
import { getintcmdqController } from "../getintegrationcommandq.js"

export const authTokenController = async (integrationData) => {
  try {
    if (!integrationData) {
      throw new Error("Missing integrationData in authTokenController");
    }
    //call: getintcmdqController
    const { authToken } = await getintcmdqController(integrationData);

    if (!authToken) {
      throw new Error("No authToken data returned from getintcmdqController");
    }

    //token or url filter from authToken
    const Token = authToken?.token;
    const url = authToken?.url;

    if (!url) {
      throw new Error("Auth URL is missing in authToken");
    }

    //fetch token 
    const response = await axios({
      url,
      headers: {
        Authorization: `Bearer ${Token || ""}`
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