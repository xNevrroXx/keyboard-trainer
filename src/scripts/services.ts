// third-party modules
import axios from "axios";
// own modules
import getCookies from "./modules/getCookies";
// types
import {
  IAdditionalDataStatistic, IAverageDataStatistic,
  IBackendUrls,
  IDataLogin,
  IDataRecover__stageCode,
  IDataRecover__stageEmail,
  IDataRecover__stagePassword,
  IDataRegister,
  IDataStatistic,
  IResponseStatistic
} from "./types";


const backendMainUrlStr = "http://localhost:5000";
const backendUrlsObj: IBackendUrls = {
  login: backendMainUrlStr + "/login",
  register: backendMainUrlStr + "/register",
  refreshToken: backendMainUrlStr + "/refreshtoken",
  logout: backendMainUrlStr + "/logout",
  authenticate: backendMainUrlStr + "/authenticate",
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

async function authenticate(): Promise<any> {
  const cookies = getCookies();

  if (cookies.accessToken && cookies.accessToken.length > 0
  || cookies.refreshToken && cookies.refreshToken.length > 0)
  {
    try {
      return await axios.post(backendUrlsObj.authenticate);
    }
    catch (error) {
      refreshToken();
    }
  }
  else {
    throw new Error("there are no tokens");
  }
}

async function refreshToken() {
  try{
    await axios.post(backendUrlsObj.refreshToken);

    window.location.reload();
  }
  catch (error) {
    window.location.reload();
  }
}

async function signIn(data: IDataLogin) {
  try {
    return await axios.post(backendUrlsObj.login, data);
  } catch (error) {
    throw error;
  }
}

async function register(data: IDataRegister) {
  try {
    const response = await axios.post(backendUrlsObj.register, data)

    alert("Success registration");
    return response;
  }
  catch (error) {
    throw error;
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
    return await axios.post(backendUrlsObj.recover.stagePassword, data);
  } catch (error) {
    alert(error.response.data.message)
    throw error;
  }
}

async function statisticDataPost(dataStatisticSpeed: {text: string, statisticData: IAverageDataStatistic[]}) {
  const data = {
    "statistic": dataStatisticSpeed,
  }

  try {
    return await axios.post(backendUrlsObj.statistic.post.speed, data);
  } catch (error) {
    throw error;
  }
}

async function statisticDataGet(searchWhichResult: string) {
  try {
    const response: any = await axios.get(backendUrlsObj.statistic.get.speed + `?which=${searchWhichResult}`);
    const data: IResponseStatistic = response.data.data;

    return data;
  } catch (error) {
    throw error;
  }
}

export {authenticate, refreshToken, signIn, register, recoverStageEmail, recoverStageCode, recoverStagePassword, logout, statisticDataPost, statisticDataGet};