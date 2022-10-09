import validate from "./validate";
import {recoverStageCode, recoverStageEmail, recoverStagePassword, register, signIn} from "../services";
import {
  dataRecover__stageCode,
  dataRecover__stageEmail,
  dataRecover__stagePassword,
} from "../types";
import form from "./form";

function recoverFormListener() {
  const stageEmailForm = document.querySelector("#email"),
    stageCodeForm = document.querySelector("#code"),
    stagePasswordForm = document.querySelector("#password");

  const formBindStageEmail = form.bind(stageEmailForm,
    (data: dataRecover__stageEmail) => validate(data, false, false, true, false),
    async (data: dataRecover__stageEmail) => await recoverStageEmail(data),
    (email: string) => window.location.href = `/pages/recovery.html?code&email=${email}`,
    true,
    false,
    false
  )
  const formBindStageCode = form.bind(stageCodeForm,
    () => {}, // we don't need to validate the verification code
    async (data: dataRecover__stageCode) => await recoverStageCode(data),
    (email: string, code: number) => window.location.href = `/pages/recovery.html?password&code=${code}&email=${email}`,
    true,
    true,
    false
  );
  const formBindStagePassword = form.bind(stagePasswordForm,
    (data: dataRecover__stagePassword) => validate(data,false, true, false, true),
    async (data: dataRecover__stagePassword) => await recoverStagePassword(data),
    false,
    false,
    true
  );

  stageEmailForm.addEventListener("submit", formBindStageEmail);
  stageCodeForm.addEventListener("submit", formBindStageCode);
  stagePasswordForm.addEventListener("submit", formBindStagePassword);
}

export default recoverFormListener;