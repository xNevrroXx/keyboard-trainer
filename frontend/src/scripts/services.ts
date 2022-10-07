import axios from "axios";
import {backendUrls} from "./types";

const backendMainUrlStr = "http://localhost:5000";
const backendUrlsObj: backendUrls = {
  login: backendMainUrlStr + "/login",
  register: backendMainUrlStr + "/register",
  refreshToken: backendMainUrlStr + "/refreshtoken",
  logout: backendMainUrlStr + "/logout",
  posts: backendMainUrlStr + "/posts"
};
let userData: any = {};

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

  if(accessToken && accessToken != "null") {
    try {
      const response = await axios.post(backendUrlsObj.posts, {}, {
        headers: {"authorization": `Bearer ${accessToken}`}
      })
      userData = response.data;
      return response.data;
    } catch (response) {
      const status = response.response.status;
      if(status === 400) {
        userData = {};
        localStorage.setItem("isAuthorized", "no");
        window.location.href = "/pages/login.html";
      }
      else if (status === 403) {
        localStorage.setItem("isAuthorized", "no");
        const isSuccess = await refreshToken(backendUrlsObj);
        if(isSuccess) {
          return await getProfile();
        }
        else {
          userData = {};
          window.location.href = "/pages/login.html";
        }
      }
    }
  }
}

async function refreshToken(backendUrlsObj: backendUrls) {
  const refreshToken = localStorage.getItem("refreshToken");

  try{
    console.log("start refresh")
    await setTimeout(function (){}, 2000)
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

function signIn(data: any) {
  axios.post(backendUrlsObj.login, data)
    .then(response => {
      localStorage.setItem("isAuthorized", "yes");
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      window.location.href = "/";
    })
    .catch(response => {
      const status = response.response.status;

      localStorage.setItem("isAuthorized", "no");
      if(status === 401) {
        alert("Incorrect password or username");
      }
      else {
        alert("We catch some error. Please try later");
      }
    });
}

function register(data: any) {
  axios.post(backendUrlsObj.register, data)
    .then(() => {
      alert("Success registration");
      signIn(data);
    })
    .catch((error) => {
      alert("We catch some error. Please try later")
    });
}

export {getData, getProfile, refreshToken, signIn, register};