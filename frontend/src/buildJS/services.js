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
    posts: backendMainUrlStr + "/posts",
    recover: {
        stageEmail: backendMainUrlStr + "/recover/getcode",
        stageCode: backendMainUrlStr + "/recover/verifycode",
        stagePassword: backendMainUrlStr + "/recover/changepassword"
    },
    statistic: {
        post: {
            speed: backendMainUrlStr + "/statistic/speed/post",
            accuracy: backendMainUrlStr + "/statistic/accuracy/post"
        },
        get: {
            speed: backendMainUrlStr + "/statistic/speed/get",
            accuracy: backendMainUrlStr + "/statistic/accuracy/get"
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
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken && accessToken !== "null") {
            try {
                const response = yield axios.post(backendUrlsObj.posts, {}, {
                    headers: { "authorization": `Bearer ${accessToken}` }
                });
                return response.data;
            }
            catch (response) {
                const status = response.response.status;
                if (status === 400) {
                    localStorage.setItem("isAuthorized", "no");
                    window.location.href = "/login";
                }
                else if (status === 403) {
                    localStorage.setItem("isAuthorized", "no");
                    const isSuccess = yield refreshToken(backendUrlsObj);
                    if (isSuccess) {
                        return yield getProfile();
                    }
                    else {
                        window.location.href = "/login";
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
            const response = yield axios.post(backendUrlsObj.refreshToken + "?last", {}, {
                headers: { refreshtoken: `Bearer ${refreshToken}` }
            });
            localStorage.setItem("isAuthorized", "yes");
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            return true;
        }
        catch (response) {
            localStorage.setItem("isAuthorized", "no");
            localStorage.setItem("userId", "null");
            localStorage.setItem("accessToken", "null");
            localStorage.setItem("refreshToken", "null");
            return false;
        }
    });
}
function signIn(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.post(backendUrlsObj.login, data);
            localStorage.setItem("isAuthorized", "yes");
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            window.location.href = "/testing";
        }
        catch (error) {
            const status = error.response.status;
            localStorage.setItem("isAuthorized", "no");
            if (status === 401) {
                throw new Error("Incorrect password or username");
            }
            else {
                throw new Error(error.response.data.message);
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
            alert(error.response.data.message);
            return new Error(error.response.data.message);
        }
    });
}
function logout() {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        yield axios.delete(backendUrlsObj.logout, {
            headers: {
                "accesstoken": `Bearer ${accessToken}`,
                "refreshtoken": `Bearer ${refreshToken}`
            }
        })
            .catch(error => {
            alert(error.response.data.message);
            throw new Error(error.response.data.message);
        });
        localStorage.setItem("isAuthorized", "no");
        localStorage.setItem("userId", "null");
        localStorage.setItem("accessToken", "null");
        localStorage.setItem("refreshToken", "null");
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
        const accessToken = localStorage.getItem("accessToken");
        const data = {
            "statistic-data": dataStatisticSpeed,
        };
        try {
            const response = yield axios.post(backendUrlsObj.statistic.post.speed, data, {
                headers: { "authorization": `Bearer ${accessToken}` }
            });
            console.log("ok in post");
            return response.data.message;
        }
        catch (error) {
            console.log("error in post");
            return new Error(error);
        }
    });
}
function statisticDataGet() {
    return __awaiter(this, void 0, void 0, function* () {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = yield axios.post(backendUrlsObj.statistic.get.speed + "?which=last", {}, {
                headers: { "authorization": `Bearer ${accessToken}` }
            });
            const formattingData = [];
            for (const dataStatisticSlice of response.data.data) {
                formattingData.push({
                    char: dataStatisticSlice["char_value"],
                    speed: dataStatisticSlice["speed_value"]
                });
            }
            console.log("ok in get");
            return formattingData;
        }
        catch (error) {
            console.log("error in get");
            return new Error(error);
        }
    });
}
export { getData, getProfile, refreshToken, signIn, register, recoverStageEmail, recoverStageCode, recoverStagePassword, logout, statisticDataPost, statisticDataGet };
