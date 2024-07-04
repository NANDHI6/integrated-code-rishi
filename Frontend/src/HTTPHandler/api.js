import { Email } from "@mui/icons-material";
import api from "./axiosConfig";
import axios from 'axios';

export const forgotUser = async (data) => {
  try {
    const response = await api.post("/user/forgot", data);
    console.log(response);
    if (response.data.status === "Success") {
      SetLocalStorageToken(response.data?.Response?.token);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

// !  for Regester Email
export const regEmailSender = async (email, password) => {
  try {
    const response = await api.post("/user/reg", {
      Email: email,
      Password: password,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    // return error.response.data;
    return error;
  }
};

export const fetchSingleData = async (data) => {
  try {
    const response = await api.get(`/singleData?email=${data}`);
    return response.data;
  } catch (error) {
    console.log(error);
    // return error.response.data;
    return [];
  }
};
export const fetchAllData = async (data) => {
  try {
    const response = await api.get("/alldatas");
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const loginUser = async (data) => {
  try {
    const response = await api.post("/user/login", data);
    console.log(response.data);
    if (response.data.Status === "Success") {
      SetLocalStorageToken(response.data?.Response?.Token);
      console.log(response);
    }
    // window.alert(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
export const SetLocalStorageToken = (token) => {
  // console.log(token);
  token && localStorage.setItem("Token", token);
};

export const ResetPassword = async (data) => {
  try {
    console.log(data);
    const response = await api.put("user/reset", data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const CheckToken = async () => {
  try {
    const response = await api.get("/user/auth");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUserReset = async (data) => {
  try {
    const response = await api.post("user/reset", data);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getActivities = async (email, filter) => {
  let filters = filter.map((x) => `'${x}'`).join(",");
  try {
    const response = await api.get(
      `/GetActivity?Email=${email}&Filter=${filters}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


// export const getProductiveData = async (attendanceDate) => {
//    console.log("hi",attendanceDate);
//   try {
//     const response = await api.get(`/productive?attendanceDate=${attendanceDate}`);
//     console.log("all data",response.data); // Log the response data to check
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching productive data:', error);
//     throw error;
//   }
// };
export const getProductiveData = async (startDate, endDate) => {
  try {
    const response = await api.get(`/productive`, {
      params: { startDate, endDate }
    });
    console.log("All data:", response.data); // Log the response data to check
    return response.data;
  } catch (error) {
    console.error('Error fetching productive data:', error);
    throw error;
  }
};


// for permisssion data
export const sendPermissionRequest = async (userEmail,currentDate, startTime, endTime, reason) => {
  try {
    const response = await api.post("/permissions", {
      Email:userEmail,
      currentdate: currentDate,
      starttime: startTime,
      endtime: endTime,
      reason: reason,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPermissionsAdmin = async () => {
  try {
    const response = await api.get("/permissions");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getPermissions = async (userEmail) => {
  try {
    const response = await axios.get(`http://localhost:4023/permissions/${userEmail}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePermissionStatus = async (id, status) => {
  try {
    const response = await api.put(`/permissions/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }

}


