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
                    window.location.href = "/views/login.html";
                }
                else if (status === 403) {
                    localStorage.setItem("isAuthorized", "no");
                    const isSuccess = yield refreshToken(backendUrlsObj);
                    if (isSuccess) {
                        return yield getProfile();
                    }
                    else {
                        window.location.href = "/views/login.html";
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
            const response = yield axios.post(backendUrlsObj.refreshToken, {}, {
                headers: { refreshtoken: `Bearer ${refreshToken}` }
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
    });
}
function signIn(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios.post(backendUrlsObj.login, data)
            .then(response => {
            localStorage.setItem("isAuthorized", "yes");
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
        })
            .catch(error => {
            const status = error.response.status;
            localStorage.setItem("isAuthorized", "no");
            if (status === 401) {
                alert("Incorrect password or username");
            }
            else {
                console.log(error);
                alert(error.response.data.message);
            }
        });
    });
}
function register(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield axios.post(backendUrlsObj.register, data)
            .then(() => __awaiter(this, void 0, void 0, function* () {
            alert("Success registration");
            yield signIn(data);
        }))
            .catch((error) => {
            alert(error.response.data.message);
        });
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
        });
        localStorage.setItem("isAuthorized", "no");
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
        axios.post(backendUrlsObj.recover.stagePassword, data)
            .then((response) => {
            const dataLogin = {
                email: data.email,
                password: data.password
            };
            signIn(dataLogin);
        })
            .catch((error) => {
            alert(error.response.data.message);
        });
    });
}
export { getData, getProfile, refreshToken, signIn, register, recoverStageEmail, recoverStageCode, recoverStagePassword, logout };
