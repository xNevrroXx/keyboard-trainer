// third-party modules
import axios from "axios";
// own modules
import getCookies from "../modules/getCookies";
// types
import {
  IAverageDataStatistic,
  IDataLogin, IDataMainData,
  IDataPasswordConfirmation,
  IDataRecover__stageCode,
  IDataRecover__stageEmail,
  IDataRecover__stagePassword,
  IDataRegister,
  IResponseStatistic, IStatisticWithText
} from "../types";
// general data
import {MATCH_BACKEND_URL} from "../generalData";

async function authenticate(): Promise<any> {
  const cookies = getCookies();

  if (cookies.accessToken && cookies.accessToken.length > 0
  || cookies.refreshToken && cookies.refreshToken.length > 0)
  {
    try {
      return await axios.post(MATCH_BACKEND_URL.authenticate);
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
    await axios.post(MATCH_BACKEND_URL.refreshToken);

    window.location.reload();
  }
  catch (error) {
    window.location.reload();
  }
}

async function signIn(data: IDataLogin) {
  try {
    return await axios.post(MATCH_BACKEND_URL.login, data);
  } catch (error) {
    throw error;
  }
}

async function register(data: IDataRegister) {
  try {
    return await axios.post(MATCH_BACKEND_URL.register, data);
  }
  catch (error) {
    throw error;
  }
}

async function logout() {
  return await axios.delete(MATCH_BACKEND_URL.logout);
}

async function deleteAccount() {
  return await axios.delete(MATCH_BACKEND_URL.deleteAccount);
}

async function changePassword(data: IDataPasswordConfirmation) {
  return await axios.put(MATCH_BACKEND_URL.changePassword, data);
}

async function changeMainData(data: IDataMainData) {
  return await axios.put(MATCH_BACKEND_URL.changeMainData, data);
}

async function resetProgress() {
  return await axios.delete(MATCH_BACKEND_URL.resetProgress);
}

async function recoverStageEmail(data: IDataRecover__stageEmail) {
  return await axios.post(MATCH_BACKEND_URL.recover.stageEmail, data);
}

async function recoverStageCode(data: IDataRecover__stageCode) {
  return await axios.post(MATCH_BACKEND_URL.recover.stageCode, data);
}

async function recoverStagePassword(data: IDataRecover__stagePassword) {
  try {
    return await axios.post(MATCH_BACKEND_URL.recover.stagePassword, data);
  } catch (error) {
    throw error;
  }
}

async function statisticDataPost(dataStatisticSpeed: IStatisticWithText) {
  const data = {
    "statistic": dataStatisticSpeed,
  }

  try {
    return await axios.post(MATCH_BACKEND_URL.statistic, data);
  } catch (error) {
    throw error;
  }
}

async function statisticDataGet(searchWhichResult: string) {
  try {
    const response: any = await axios.get(MATCH_BACKEND_URL.statistic + `?which=${searchWhichResult}`);
    const data: IResponseStatistic = response.data.data;

    console.log("services statistic: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export {
  authenticate, refreshToken, signIn, register, logout,
  recoverStageEmail, recoverStageCode, recoverStagePassword,
  deleteAccount, resetProgress,
  changePassword, changeMainData,
  statisticDataPost, statisticDataGet,
};