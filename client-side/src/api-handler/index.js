import axios from "axios";
export const serverUrl = "http://localhost:8060";

export const postApiHandler = async (endpoint, values) => {
  try {
    const result = await axios.post(serverUrl + endpoint, values);
    console.log("frontend post: ", result);
    return result;
  } catch (error) {
    return error;
  }
};

export const getApiHandler = async (endpoint) => {
  try {
    const result = await axios.get(serverUrl + endpoint);
    return result.data;
  } catch (error) {
    return error;
  }
};

export const deleteApiHandler = async (endpoint) => {
  const result = await axios.delete(serverUrl + endpoint);
  return result.data;
};

export const putApiHandler = async (endpoint, values) => {
  const result = await axios.put(serverUrl + endpoint, values);
  return result;
};
