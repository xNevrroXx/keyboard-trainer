// own modules
import loginFormTab from "../modules/loginFormTab";
import loginFormListener from "../modules/loginFormListener";
import {authenticate} from "../services/services";
// general statisticData
import {MATCH_PAGES_URL} from "../generalData";

async function login() {
  try {
    const authenticateResponse = await authenticate();

    window.location.href = MATCH_PAGES_URL["testing"].pathname;
  } catch {
    document.querySelector("button#forgot-password").addEventListener("click", () => {
      window.location.href = MATCH_PAGES_URL["recovery"].pathname + MATCH_PAGES_URL["recovery"].possibleHashValue["email"];
    });

    loginFormTab();
    loginFormListener();
  }
}

export default login;