var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
const backendMainUrlStr = "http://localhost:5000";
const backendUrlsObj = {
    login: backendMainUrlStr + "/login",
    register: backendMainUrlStr + "/register",
    refreshToken: backendMainUrlStr + "/refreshtoken",
    logout: backendMainUrlStr + "/logout",
    posts: backendMainUrlStr + "/posts"
};
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        // const result = await fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=1');
        const result = yield fetch('https://www.googleapis.com/books/v1/volumes?q=энциклопедия');
        try {
            return result.json();
        }
        catch (e) {
            console.log(e);
        }
    });
}
function getProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = localStorage.getItem("accessToken");
        console.log("accessToken: ", accessToken);
        if (accessToken != "null") {
            console.log("start get profile");
            try {
                const response = yield axios.post(backendUrlsObj.posts, {}, {
                    headers: { "Authorization": `Bearer ${accessToken}` }
                });
                console.log("response: ", response);
                return response.data;
            }
            catch (response) {
                console.log("response in error: ", response);
                const status = response.response.status;
                if (status === 400) {
                    localStorage.setItem("isAuthorized", "no");
                    window.location.href = "/pages/login.html";
                }
                else if (status === 403) {
                    localStorage.setItem("isAuthorized", "no");
                    const isSuccess = yield refreshToken(backendUrlsObj);
                    if (isSuccess) {
                        yield getProfile();
                    }
                    else {
                        window.location.href = "/pages/login.html";
                    }
                }
            }
        }
    });
}
function refreshToken(backendUrlsObj) {
    return __awaiter(this, void 0, void 0, function* () {
        const refreshToken = localStorage.getItem("refreshToken");
        try {
            const response = yield axios.post(backendUrlsObj.refreshToken, { token: refreshToken });
            console.log("new tokens: ", response.data); // todo remove line
            localStorage.setItem("isAuthorized", "yes");
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            return true;
        }
        catch (response) { // недействительный/неверный refreshToken
            localStorage.setItem("isAuthorized", "no");
            localStorage.setItem("accessToken", "null");
            localStorage.setItem("refreshToken", "null");
            return false;
        }
    });
}
function signIn(data) {
    axios.post(backendUrlsObj.login, data)
        .then(response => {
        console.log(response);
        localStorage.setItem("isAuthorized", "yes");
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        window.location.href = "/";
    })
        .catch(response => {
        const status = response.response.status;
        localStorage.setItem("isAuthorized", "no");
        if (status === 401) {
            alert("Incorrect password or username");
        }
        else {
            alert("We catch some error. Please try later");
        }
    });
}
function register(data) {
    axios.post(backendUrlsObj.register, data)
        .then(() => {
        alert("Success registration");
        signIn(data);
    })
        .catch((error) => {
        console.log(error); // todo remove line
        alert("We catch some error. Please try later");
    });
}
export { getData, getProfile, refreshToken, signIn, register };
