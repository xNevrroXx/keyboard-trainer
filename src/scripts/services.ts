// third-party modules
import axios from "axios";
// own modules
import getCookies from "./modules/getCookies";
// types
import {
  IAdditionalDataStatisticSpeed,
  IBackendUrls,
  IDataLogin,
  IDataRecover__stageCode,
  IDataRecover__stageEmail,
  IDataRecover__stagePassword,
  IDataRegister, IDataStatistic
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
  },
  statistic: {
    post: {
      speed: backendMainUrlStr + "/statistic/speed",
      accuracy: backendMainUrlStr + "/statistic/accuracy"
    },
    get: {
      speed: backendMainUrlStr + "/statistic/speed",
      accuracy: backendMainUrlStr + "/statistic/accuracy"
    }
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
  const cookies = getCookies();
  if (cookies.isAuthorized && cookies.isAuthorized === "false"
  && cookies.refreshToken && cookies.refreshToken.length > 0)
  {
    try {
      const response = await axios.post(backendUrlsObj.posts);

      return response.data;
    }
    catch (error) {
      try {
        const refreshResponse = await refreshToken();
        console.log("refreshResponse: ", refreshResponse);
        if(refreshResponse.response.status < 200 || refreshResponse.response.status >= 300) {
          console.log("in error block")
          throw refreshResponse;
        }
        return await getProfile();
      }
      catch (error) {
        console.log("redirect to login");
        window.location.href = "/login";
      }
    }
  }
}

async function refreshToken() {
  try{
    console.log("start refresh");
    const response = await axios.post(backendUrlsObj.refreshToken, {});

    window.location.reload();
    return response;
  }
  catch (error) {
    return error;
  }
}

async function signIn(data: IDataLogin) {
  try {
    const response = await axios.post(backendUrlsObj.login, data);

    return response;
  } catch (error) {
    const status = error.response.status;

    if (status === 401) {
      return error;
    } else if (status === 409) {
      return error;
    }
    else {
      return error;
    }
  }
}

async function register(data: IDataRegister) {
  try {
    const response = await axios.post(backendUrlsObj.register, data)

    alert("Success registration");
    return await signIn(data);
  }
  catch (error) {
    return error;
  }
}

async function logout() {
  return await axios.delete(backendUrlsObj.logout);
}

async function recoverStageEmail(data: IDataRecover__stageEmail) {
  return await axios.post(backendUrlsObj.recover.stageEmail, data);
}

async function recoverStageCode(data: IDataRecover__stageCode) {
  return await axios.post(backendUrlsObj.recover.stageCode, data);
}

async function recoverStagePassword(data: IDataRecover__stagePassword) {
  try {
    const response = await axios.post(backendUrlsObj.recover.stagePassword, data);

    const dataLogin: IDataLogin = {
      email: data.email,
      password: data.password
    };

    await signIn(dataLogin);
  } catch (error) {
    alert(error.response.data.message)
  }
}

async function statisticDataPost(dataStatisticSpeed: IAdditionalDataStatisticSpeed[]) {
  const data = {
    "statistic-data": dataStatisticSpeed,
  }

  try {
    const response = await axios.post(backendUrlsObj.statistic.post.speed, data);
    return response.data.message;
  } catch (error) {
    return new Error(error);
  }
}

async function statisticDataGet(searchWhichResult: string) {
  try {
    const response: any = await axios.get(backendUrlsObj.statistic.get.speed + `?which=${searchWhichResult}`);
    const data: IDataStatistic = response.data.data;

    return data;
  } catch (error) {
    return new Error(error);
  }
}

export {getData, getProfile, refreshToken, signIn, register, recoverStageEmail, recoverStageCode, recoverStagePassword, logout, statisticDataPost, statisticDataGet};