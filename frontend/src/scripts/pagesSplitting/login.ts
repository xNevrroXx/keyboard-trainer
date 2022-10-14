// types
import {IMatchPagesUrl} from "../types";
// own modules
import loginFormTab from "../modules/loginFormTab";
import loginFormListener from "../modules/loginFormListener";

function login(MATCH_PAGES_URL: IMatchPagesUrl) {
  if (localStorage.getItem("isAuthorized") === "yes" && localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")) {
    window.location.href = MATCH_PAGES_URL["testing"].pathname;
  }
  document.querySelector("button#forgot-password").addEventListener("click", () => {
    window.location.href = MATCH_PAGES_URL["recovery"].pathname + "?" + MATCH_PAGES_URL["recovery"].possibleSearchValue["email"];
  });
  loginFormTab(MATCH_PAGES_URL);
  loginFormListener(MATCH_PAGES_URL);
}

export default login;