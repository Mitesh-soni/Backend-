import axios from "axios"

export const callAllapiController = async (userData) => {
  try {
    const { Data, ApiUrl, Method, Token } = userData;
    console.log(Data, ApiUrl, Method, Token )
    const response = await axios({
      method: Method,
      url: ApiUrl,
      data: Data||{},
      headers: {
        Authorization: `Bearer ${Token}`
      }
    })
    return {
      success: true,
      data: response.data,
      status: response.status,
    };
  }
  catch (err) {
    return { success: false, error: err.message };
  }
}