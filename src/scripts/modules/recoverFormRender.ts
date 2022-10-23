// general statisticData
import {MATCH_PAGES_URL} from "../generalData";

function recoverFormRender() {
  const stageEmailForm = document.querySelector("#stage-email"),
    stageCodeForm = document.querySelector("#stage-code"),
    stageNewPasswordForm = document.querySelector("#stage-new-password");

  if (window.location.hash === ""
    ||
    (
      window.location.hash !== MATCH_PAGES_URL["recovery"].possibleHashValue["email"]
      && window.location.hash !== MATCH_PAGES_URL["recovery"].possibleHashValue["code"]
      && window.location.hash !== MATCH_PAGES_URL["recovery"].possibleHashValue["password"]
    )
  ) {
    window.location.href = MATCH_PAGES_URL["recovery"].pathname + MATCH_PAGES_URL["recovery"].possibleHashValue["email"];
  }

  if (window.location.hash === MATCH_PAGES_URL["recovery"].possibleHashValue["email"]) {
    stageEmailForm.classList.add("active");

    stageCodeForm.classList.remove("active");
    stageNewPasswordForm.classList.remove("active");
  }
  else if (window.location.hash === MATCH_PAGES_URL["recovery"].possibleHashValue["code"]) {
    stageCodeForm.classList.add("active");

    stageEmailForm.classList.remove("active");
    stageNewPasswordForm.classList.remove("active");
  }
  else if (window.location.hash === MATCH_PAGES_URL["recovery"].possibleHashValue["password"]) {
    stageNewPasswordForm.classList.add("active");

    stageEmailForm.classList.remove("active");
    stageCodeForm.classList.remove("active");
  }
}

export default recoverFormRender;