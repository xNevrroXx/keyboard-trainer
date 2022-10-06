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

async function getProfile() {
  const accessToken = localStorage.getItem("accessToken");
  console.log("accessToken: ", accessToken);

  if(accessToken != "null") {
    console.log("start get profile")
    try {
      const response = await axios.post(backendUrlsObj.posts, {}, {
        headers: {"Authorization": `Bearer ${accessToken}`}
      })
      console.log("response: ", response);
      return response.data;
    } catch (response) {
      console.log("response in error: ", response)
      const status = response.response.status;
      if(status === 400) {
        localStorage.setItem("isAuthorized", "no");
        window.location.href = "/pages/login.html";
      }
      else if (status === 403) {
        localStorage.setItem("isAuthorized", "no");
        const isSuccess = await refreshToken(backendUrlsObj);
        if(isSuccess) {
          await getProfile();
        }
        else {
          window.location.href = "/pages/login.html";
        }
      }
    }
  }
}

async function refreshToken(backendUrlsObj: backendUrls) {
  const refreshToken = localStorage.getItem("refreshToken");

  try{
    const response = await axios.post(backendUrlsObj.refreshToken, {token: refreshToken});

    console.log("new tokens: ", response.data); // todo remove line
    localStorage.setItem("isAuthorized", "yes");
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return true;
  }
  catch (response) {// недействительный/неверный refreshToken
    localStorage.setItem("isAuthorized", "no");
    localStorage.setItem("accessToken", "null");
    localStorage.setItem("refreshToken", "null");
    return false;
  }
}

function signIn(data: any) {
  axios.post(backendUrlsObj.login, data)
    .then(response => {
      console.log(response)
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
      console.log(error) // todo remove line
      alert("We catch some error. Please try later")
    });
}

export {getData, getProfile, refreshToken, signIn, register};