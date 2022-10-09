import validate from "./validate";
import { recoverStageCode, recoverStageEmail, recoverStagePassword } from "../services";
import form from "./form";
function recoverForm() {
    const stageEmailForm = document.querySelector("#email"), stageCodeForm = document.querySelector("#code"), stagePasswordForm = document.querySelector("#password");
    if (window.location.search !== "?email" && window.location.search !== "?code" && window.location.search !== "?password") {
        window.location.href = "/pages/recovery.html?email";
    }
    const formBindStageEmail = form.bind(stageEmailForm, event, (data) => validate(data, false, false, true, false), (data) => recoverStageEmail(data), () => window.location.href = "/pages/recovery.html?code");
    const formBindStageCode = form.bind(stageCodeForm, event, () => { }, // we don't need to validate the verification code
    (data) => recoverStageCode(data), () => window.location.href = "/pages/recovery.html?password");
    const formBindStagePassword = form.bind(stagePasswordForm, event, (data) => validate(data, false, true, false, true), (data) => recoverStagePassword(data), () => window.location.href = "/pages/login.html?sign-in");
    stageEmailForm.addEventListener("submit", formBindStageEmail);
    stageCodeForm.addEventListener("submit", formBindStageCode);
    stagePasswordForm.addEventListener("submit", formBindStagePassword);
}
export default recoverForm;
