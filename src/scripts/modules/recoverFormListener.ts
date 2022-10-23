import validate from "./validate";
import {recoverStageCode, recoverStageEmail, recoverStagePassword} from "../services/services";
import {
  IDataRecover__stageCode,
  IDataRecover__stageEmail,
  IDataRecover__stagePassword
} from "../types";
import form from "./form";
// general statisticData
import {MATCH_PAGES_URL} from "../generalData";

function recoverFormListener() {
  const stageEmailForm = document.querySelector("#email"),
    stageCodeForm = document.querySelector("#code"),
    stagePasswordForm = document.querySelector("#password");

  const formBindStageEmail = form.bind(stageEmailForm,
    (data: IDataRecover__stageEmail) => validate(data, "email"),
    async (data: IDataRecover__stageEmail) => await recoverStageEmail(data), // todo setCookie email httpOnly from the server
    () => {
      window.location.href = MATCH_PAGES_URL["recovery"].pathname + MATCH_PAGES_URL["recovery"].possibleHashValue["code"];
      window.location.reload();
    }
  )
  const formBindStageCode = form.bind(stageCodeForm,
    () => {}, // we don't need to validate the verification code
    async (data: IDataRecover__stageCode) => await recoverStageCode(data), // todo setCookie code httpOnly from the server
    () => {
      window.location.href = MATCH_PAGES_URL["recovery"].pathname + MATCH_PAGES_URL["recovery"].possibleHashValue["password"];
      window.location.reload();
    }
  );
  const formBindStagePassword = form.bind(stagePasswordForm,
    (data: IDataRecover__stagePassword) => validate(data, "passwordConfirmation"),
    async (data: IDataRecover__stagePassword) => await recoverStagePassword(data),
    () => window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"]
  );

  stageEmailForm.addEventListener("submit", formBindStageEmail);
  stageCodeForm.addEventListener("submit", formBindStageCode);
  stagePasswordForm.addEventListener("submit", formBindStagePassword);
}

export default recoverFormListener;