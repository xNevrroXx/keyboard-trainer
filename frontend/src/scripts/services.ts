import axios from "axios";
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
        window.location.href = "/login";
      }
      else if (status === 403) {
        localStorage.setItem("isAuthorized", "no");
        const isSuccess = await refreshToken(backendUrlsObj);
        if(isSuccess) {
          return await getProfile();
        }
        else {
          window.location.href = "/login";
        }
      }
    }
  }
}

async function refreshToken(backendUrlsObj: IBackendUrls) {
  const refreshToken = localStorage.getItem("refreshToken");

  try{
    const response = await axios.post(backendUrlsObj.refreshToken + "?last", {}, {
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
  try {
    const response = await axios.post(backendUrlsObj.login, data);

    localStorage.setItem("isAuthorized", "yes");
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    window.location.href = "/testing";
  } catch (error) {
    const status = error.response.status;

    localStorage.setItem("isAuthorized", "no");
    if (status === 401) {
      throw new Error("Incorrect password or username");
    } else {
      throw new Error(error.response.data.message);
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
    alert(error.response.data.message)
    return new Error(error.response.data.message);
  }
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
      throw new Error(error.response.data.message);
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
  const accessToken = localStorage.getItem("accessToken");
  const data = {
    "statistic-data": dataStatisticSpeed,
  }

  try {
    const response = await axios.post(backendUrlsObj.statistic.post.speed, data, {
      headers: {"authorization": `Bearer ${accessToken}`}
    });
    console.log("ok in post")
    return response.data.message;
  } catch (error) {
    console.log("error in post")
    return new Error(error);
  }
}

async function statisticDataGet(searchWhichResult: string) {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response: any = await axios.get(backendUrlsObj.statistic.get.speed + `?which=${searchWhichResult}`, {
      headers: {"authorization": `Bearer ${accessToken}`}
    });
    const data: IDataStatistic = response.data.data;

    console.log(data)
    return data;
  } catch (error) {
    return new Error(error);
  }
}

export {getData, getProfile, refreshToken, signIn, register, recoverStageEmail, recoverStageCode, recoverStagePassword, logout, statisticDataPost, statisticDataGet};