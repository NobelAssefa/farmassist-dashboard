import axiosInstance from "../api/apihelper";
let api = axiosInstance;
export const get_all_woredas = async () => {
  try {
    const response = await api.get("/woredas/");
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

export const create_woreda = async (val) => {
  console.log(val);
  try {
    const response = await api.post("/woreda/create", {
      fname: val.firstName,
      Mname: val.middleName,
      lname: val.lastName,
      phone: val.phone,
      sex: val.sex,
      profile: "453453453ertr",
      woreda_name: val.woreda,
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

export const get_woreda = async (id) => {
  try {
    const response = await api.get(`/woreda/${id}`);
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


export const update_woreda = async (id,values) => {
 
  console.log("i will try to send this",values)
  try {
    const response = await api.put(`/woreda/${id}/update/`,values);
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