import recoverFormRender from "../modules/recoverFormRender";
import recoverFormListener from "../modules/recoverFormListener";
import {IMatchPagesUrl} from "../types";

function recovery(MATCH_PAGES_URL: IMatchPagesUrl) {
  if (localStorage.getItem("isAuthorized") === "yes" && localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")) {
    window.location.href = MATCH_PAGES_URL["testing"].pathname;
  }
  document.querySelector("button#try-again").addEventListener("click", () => {
    window.location.href = MATCH_PAGES_URL["login"] + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"];
  });
  recoverFormRender(MATCH_PAGES_URL);
  recoverFormListener(MATCH_PAGES_URL);
}

export default recovery;