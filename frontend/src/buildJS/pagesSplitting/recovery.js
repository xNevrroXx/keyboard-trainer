import recoverFormRender from "../modules/recoverFormRender";
import recoverFormListener from "../modules/recoverFormListener";
function recovery() {
    if (localStorage.getItem("isAuthorized") === "yes" && localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")) {
        window.location.href = "/";
    }
    document.querySelector("button#try-again").addEventListener("click", () => {
        window.location.href = "/views/login.html?sign-in";
    });
    recoverFormRender();
    recoverFormListener();
}
export default recovery;
