var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import validate from "./validate";
import { recoverStageCode, recoverStageEmail, recoverStagePassword } from "../services";
import form from "./form";
function recoverFormListener() {
    const stageEmailForm = document.querySelector("#email"), stageCodeForm = document.querySelector("#code"), stagePasswordForm = document.querySelector("#password");
    const formBindStageEmail = form.bind(stageEmailForm, (data) => validate(data, false, false, true, false), (data) => __awaiter(this, void 0, void 0, function* () { return yield recoverStageEmail(data); }), (email) => window.location.href = `/pages/recovery.html?code&email=${email}`, true, false, false);
    const formBindStageCode = form.bind(stageCodeForm, () => { }, // we don't need to validate the verification code
    (data) => __awaiter(this, void 0, void 0, function* () { return yield recoverStageCode(data); }), (email, code) => window.location.href = `/pages/recovery.html?password&code=${code}&email=${email}`, true, true, false);
    const formBindStagePassword = form.bind(stagePasswordForm, (data) => validate(data, false, true, false, true), (data) => __awaiter(this, void 0, void 0, function* () { return yield recoverStagePassword(data); }), false, false, true);
    stageEmailForm.addEventListener("submit", formBindStageEmail);
    stageCodeForm.addEventListener("submit", formBindStageCode);
    stagePasswordForm.addEventListener("submit", formBindStagePassword);
}
export default recoverFormListener;
