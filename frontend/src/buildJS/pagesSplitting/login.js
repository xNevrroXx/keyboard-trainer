// own modules
import loginFormTab from "../modules/loginFormTab";
import loginFormListener from "../modules/loginFormListener";
function login(MATCH_PAGES_URL) {
    if (localStorage.getItem("isAuthorized") === "yes" && localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")) {
        window.location.href = "/";
    }
    document.querySelector("button#forgot-password").addEventListener("click", () => {
        window.location.href = "/views/recovery.html?email";
    });
    loginFormTab(MATCH_PAGES_URL);
    loginFormListener(MATCH_PAGES_URL);
}
export default login;
