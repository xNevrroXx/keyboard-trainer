var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// third-party modules
import axios from "axios";
// own modules
import getCookies from "./modules/getCookies";
const backendMainUrlStr = "http://localhost:5000";
const backendUrlsObj = {
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
        const cookies = getCookies();
        if (cookies.isAuthorized && cookies.isAuthorized === "false"
            && cookies.refreshToken && cookies.refreshToken.length > 0) {
            try {
                const response = yield axios.post(backendUrlsObj.posts);
                return response.data;
            }
            catch (error) {
                try {
                    const refreshResponse = yield refreshToken();
                    console.log("refreshResponse: ", refreshResponse);
                    if (refreshResponse.response.status < 200 || refreshResponse.response.status >= 300) {
                        console.log("in error block");
                        throw refreshResponse;
                    }
                    return yield getProfile();
                }
                catch (error) {
                    console.log("redirect to login");
                    window.location.href = "/login";
                }
            }
        }
    });
}
function refreshToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("start refresh");
            const response = yield axios.post(backendUrlsObj.refreshToken, {});
            window.location.reload();
            return response;
        }
        catch (error) {
            return error;
        }
    });
}
function signIn(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.post(backendUrlsObj.login, data);
            return response;
        }
        catch (error) {
            const status = error.response.status;
            if (status === 401) {
                return error;
            }
            else if (status === 409) {
                return error;
            }
            else {
                return error;
            }
        }
    });
}
function register(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.post(backendUrlsObj.register, data);
            alert("Success registration");
            return yield signIn(data);
        }
        catch (error) {
            return error;
        }
    });
}
function logout() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios.delete(backendUrlsObj.logout);
    });
}
function recoverStageEmail(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios.post(backendUrlsObj.recover.stageEmail, data);
    });
}
function recoverStageCode(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios.post(backendUrlsObj.recover.stageCode, data);
    });
}
function recoverStagePassword(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.post(backendUrlsObj.recover.stagePassword, data);
            const dataLogin = {
                email: data.email,
                password: data.password
            };
            yield signIn(dataLogin);
        }
        catch (error) {
            alert(error.response.data.message);
        }
    });
}
function statisticDataPost(dataStatisticSpeed) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            "statistic-data": dataStatisticSpeed,
        };
        try {
            const response = yield axios.post(backendUrlsObj.statistic.post.speed, data);
            return response.data.message;
        }
        catch (error) {
            return new Error(error);
        }
    });
}
function statisticDataGet(searchWhichResult) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(backendUrlsObj.statistic.get.speed + `?which=${searchWhichResult}`);
            const data = response.data.data;
            return data;
        }
        catch (error) {
            return new Error(error);
        }
    });
}
export { getData, getProfile, refreshToken, signIn, register, recoverStageEmail, recoverStageCode, recoverStagePassword, logout, statisticDataPost, statisticDataGet };
