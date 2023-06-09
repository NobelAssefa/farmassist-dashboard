import axiosInstance from "../api/apihelper";
let api = axiosInstance;
export const get_all_regions = async () => {
  try {
    const response = await api.get("/regions");
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

export const get_region = async (id) => {
  try {
    const response = await api.get(`/region/${id}`);
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


export const create_region = async (val) => {
  console.log(val);
  try {
    const response = await api.post("/region/create", {
      fname: val.firstName,
      Mname: val.middleName,
      lname: val.lastName,
      phone: val.phone,
      sex: val.sex,
      profile: "453453453ertr",
      region_name: val.region,
      username: val.userName,
      email: val.email,
      password: val.passWord,
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

export const update_region = async (id,values) => {
 
  console.log("i will try to send this",values)
  try {
    const response = await api.put(`/region/${id}/update/`,values);
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