import validate from "./validate";
import {recoverStageCode, recoverStageEmail, recoverStagePassword, register, signIn} from "../services";
import {
  IDataRecover__stageCode,
  IDataRecover__stageEmail,
  IDataRecover__stagePassword,
  IMatchPagesUrl,
} from "../types";
import form from "./form";
// general statisticData
import {MATCH_PAGES_URL} from "../generalData";

function recoverFormListener() {
  const stageEmailForm = document.querySelector("#email"),
    stageCodeForm = document.querySelector("#code"),
    stagePasswordForm = document.querySelector("#password");

  const formBindStageEmail = form.bind(stageEmailForm,
    (data: IDataRecover__stageEmail) => validate(data, false, false, true, false),
    async (data: IDataRecover__stageEmail) => await recoverStageEmail(data),
    (email: string) => window.location.href = `${MATCH_PAGES_URL["recovery"].pathname}?${MATCH_PAGES_URL["recovery"].possibleSearchValue["code"]}&${MATCH_PAGES_URL["recovery"].possibleSearchValue["email"]}` + "=" + email,
    true,
    false,
    false
  )
  const formBindStageCode = form.bind(stageCodeForm,
    () => {}, // we don't need to validate the verification code
    async (data: IDataRecover__stageCode) => await recoverStageCode(data),
    (email: string, code: number) => window.location.href =
      `${MATCH_PAGES_URL["recovery"].pathname}?${MATCH_PAGES_URL["recovery"].possibleSearchValue["password"]}&${MATCH_PAGES_URL["recovery"].possibleSearchValue["code"]}=${code}&${MATCH_PAGES_URL["recovery"].possibleSearchValue["email"]}=${email}`,
    true,
    true,
    false
  );
  const formBindStagePassword = form.bind(stagePasswordForm,
    (data: IDataRecover__stagePassword) => validate(data, false, true, false, true),
    async (data: IDataRecover__stagePassword) => await recoverStagePassword(data),
    () => window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"],
    false,
    false,
    true
  );

  stageEmailForm.addEventListener("submit", formBindStageEmail);
  stageCodeForm.addEventListener("submit", formBindStageCode);
  stagePasswordForm.addEventListener("submit", formBindStagePassword);
}

export default recoverFormListener;