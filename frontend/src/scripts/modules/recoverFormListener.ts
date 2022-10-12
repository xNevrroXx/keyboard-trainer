import validate from "./validate";
import {recoverStageCode, recoverStageEmail, recoverStagePassword, register, signIn} from "../services";
import {
  IDataRecover__stageCode,
  IDataRecover__stageEmail,
  IDataRecover__stagePassword,
} from "../types";
import form from "./form";

function recoverFormListener() {
  const stageEmailForm = document.querySelector("#email"),
    stageCodeForm = document.querySelector("#code"),
    stagePasswordForm = document.querySelector("#password");

  const formBindStageEmail = form.bind(stageEmailForm,
    (data: IDataRecover__stageEmail) => validate(data, false, false, true, false),
    async (data: IDataRecover__stageEmail) => await recoverStageEmail(data),
    (email: string) => window.location.href = `/pages/recovery.html?code&email=${email}`,
    true,
    false,
    false
  )
  const formBindStageCode = form.bind(stageCodeForm,
    () => {}, // we don't need to validate the verification code
    async (data: IDataRecover__stageCode) => await recoverStageCode(data),
    (email: string, code: number) => window.location.href = `/pages/recovery.html?password&code=${code}&email=${email}`,
    true,
    true,
    false
  );
  const formBindStagePassword = form.bind(stagePasswordForm,
    (data: IDataRecover__stagePassword) => validate(data,false, true, false, true),
    async (data: IDataRecover__stagePassword) => await recoverStagePassword(data),
    false,
    false,
    true
  );

  stageEmailForm.addEventListener("submit", formBindStageEmail);
  stageCodeForm.addEventListener("submit", formBindStageCode);
  stagePasswordForm.addEventListener("submit", formBindStagePassword);
}

export default recoverFormListener;