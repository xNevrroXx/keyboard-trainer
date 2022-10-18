// types
import {IMatchPagesUrl} from "../types";

function recoverFormRender(MATCH_PAGES_URL: IMatchPagesUrl) {
  const stageEmailForm = document.querySelector("#stage-email"),
    stageCodeForm = document.querySelector("#stage-code"),
    stageNewPasswordForm = document.querySelector("#stage-new-password");

  if(window.location.search === "") {
    window.location.href = window.location.pathname + "?email";
  }
  else if(window.location.search !== "?email" && !window.location.search.includes("?code&email=") && !/\?password&code=\d{6}&email=.*$/.test(window.location.search)) {
    window.location.href = MATCH_PAGES_URL["recovery"].pathname + "?" + MATCH_PAGES_URL["recovery"].possibleSearchValue["email"];
  }

  if (window.location.search === "?email") {
    stageEmailForm.classList.add("active");

    stageCodeForm.classList.remove("active");
    stageNewPasswordForm.classList.remove("active");
  }
  else if (window.location.search.includes("?code&email=")) {
    stageCodeForm.classList.add("active");

    stageEmailForm.classList.remove("active");
    stageNewPasswordForm.classList.remove("active");
  }
  else if (/\?password&code=\d{6}&email=.*$/.test(window.location.search)) {
    stageNewPasswordForm.classList.add("active");

    stageEmailForm.classList.remove("active");
    stageCodeForm.classList.remove("active");
  }
}

export default recoverFormRender;