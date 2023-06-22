import axiosInstance from "../api/apihelper";
let api = axiosInstance;
export const get_resources = async () => {
  try {
    const response = await api.get("/resources/");
    return { success: true, data: response.data };
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      return { success: false, data: null, error: err.response.data.message };
    } else {
      console.log(`Error: ${err.message}`);
    }
  }
};
<<<<<<< HEAD

export const get_sent_resources = async () => {
  try {
    const response = await api.get("/sentresources/");
    return { success: true, data: response.data };
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      return { success: false, data: null, error: err.response.data.message };
    } else {
      console.log(`Error: ${err.message}`);
    }
  }
};

export const transfer_resource = async (val) => {
  console.log(val);
  try {
    const response = await api.post("/transfer/", {
      to: val.to,
      resource_id: val.resource_id,
      amount: val.amount,
    });
    return { success: true, data: response.data };
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      return { success: false, data: null, error: err.response.data.message };
    } else {
      console.log(`Error: ${err.message}`);
    }
  }
};
=======
>>>>>>> parent of 9a3375e (latest with transfer resource)
