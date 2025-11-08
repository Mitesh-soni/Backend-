import { getintcmdqController } from "../getintegrationcommandq.js";

export const authTokenController = async (getintegrationcommandqData) => {
  try {
    const {authToken} = getintegrationcommandqData;
    const Token = authToken.token;
    // console.log(Token);
    return {Token};
  } catch (err) {
    console.error("Error in authTokenController:", err.message);
    return { success: false, error: err.message };
  }
};