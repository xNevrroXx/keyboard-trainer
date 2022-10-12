import axios from "axios";
import {
  IBackendUrls,
  IDataLogin,
  IDataRecover__stageCode,
  IDataRecover__stageEmail,
  IDataRecover__stagePassword,
  IDataRegister
} from "./types";


const backendMainUrlStr = "http://localhost:5000";
const backendUrlsObj: IBackendUrls = {
  login: backendMainUrlStr + "/login",
  register: backendMainUrlStr + "/register",
  refreshToken: backendMainUrlStr + "/refreshtoken",
  logout: backendMainUrlStr + "/logout",
  posts: backendMainUrlStr + "/posts",
  recover: {
    stageEmail: backendMainUrlStr + "/recover/getcode",
    stageCode: backendMainUrlStr + "/recover/verifycode",
    stagePassword: backendMainUrlStr + "/recover/changepassword"
  }
};

async function getData() {
  // const result = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1');
  const result = await fetch('https://www.googleapis.com/books/v1/volumes?q=энциклопедия');
  try {
    return result.json();
  }
  catch (e) {
    console.log(e);
  }
}

async function getProfile(): Promise<any> {
  const accessToken = localStorage.getItem("accessToken");

  if(accessToken && accessToken !== "null") {
    try {
      const response = await axios.post(backendUrlsObj.posts, {}, {
        headers: {"authorization": `Bearer ${accessToken}`}
      })
      return response.data;
    } catch (response) {
      const status = response.response.status;
      if(status === 400) {
        localStorage.setItem("isAuthorized", "no");
        window.location.href = "/views/login.html";
      }
      else if (status === 403) {
        localStorage.setItem("isAuthorized", "no");
        const isSuccess = await refreshToken(backendUrlsObj);
        if(isSuccess) {
          return await getProfile();
        }
        else {
          window.location.href = "/views/login.html";
        }
      }
    }
  }
}

async function refreshToken(backendUrlsObj: IBackendUrls) {
  const refreshToken = localStorage.getItem("refreshToken");

  try{
    const response = await axios.post(backendUrlsObj.refreshToken, {}, {
      headers: {refreshtoken: `Bearer ${refreshToken}`}
    });

    localStorage.setItem("isAuthorized", "yes");
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return true;
  }
  catch (response) {
    localStorage.setItem("isAuthorized", "no");
    localStorage.setItem("accessToken", "null");
    localStorage.setItem("refreshToken", "null");
    return false;
  }
}

async function signIn(data: IDataLogin) {
  await axios.post(backendUrlsObj.login, data)
    .then(response => {
      localStorage.setItem("isAuthorized", "yes");
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    })
    .catch(error => {
      const status = error.response.status;

      localStorage.setItem("isAuthorized", "no");
      if(status === 401) {
        alert("Incorrect password or username");
      }
      else {
        console.log(error)
        alert(error.response.data.message);
      }
    });
}

async function register(data: IDataRegister) {
  await axios.post(backendUrlsObj.register, data)
    .then(async () => {
      alert("Success registration");
      await signIn(data);
    })
    .catch((error) => {
      alert(error.response.data.message)
    });
}

async function logout() {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  await axios.delete(backendUrlsObj.logout, {
    headers: {
      "accesstoken": `Bearer ${accessToken}`,
      "refreshtoken": `Bearer ${refreshToken}`
    }
  })
    .catch (error => {
      alert(error.response.data.message);
    })
  localStorage.setItem("isAuthorized", "no");
  localStorage.setItem("accessToken", "null");
  localStorage.setItem("refreshToken", "null");
}

async function recoverStageEmail(data: IDataRecover__stageEmail) {
  return await axios.post(backendUrlsObj.recover.stageEmail, data);
}

async function recoverStageCode(data: IDataRecover__stageCode) {
  return await axios.post(backendUrlsObj.recover.stageCode, data);
}

async function recoverStagePassword(data: IDataRecover__stagePassword) {
  axios.post(backendUrlsObj.recover.stagePassword, data)
    .then((response) => {
      const dataLogin: IDataLogin = {
        email: data.email,
        password: data.password
      };

      signIn(dataLogin);
    })
    .catch((error) => {
      alert(error.response.data.message)
    })
}

export {getData, getProfile, refreshToken, signIn, register, recoverStageEmail, recoverStageCode, recoverStagePassword, logout};