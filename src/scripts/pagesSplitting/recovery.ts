import recoverFormRender from "../modules/recoverFormRender";
import recoverFormListener from "../modules/recoverFormListener";
import {authenticate} from "../services";
import initTesting from "../modules/initTesting";
// general statisticData
import {MATCH_PAGES_URL} from "../generalData";

async function recovery() {
  try {
    const authenticateResponse = await authenticate();

    initTesting(() => window.location.href = MATCH_PAGES_URL["testing"].pathname);
  } catch {
    document.querySelector("button#try-again").addEventListener("click", () => {
      window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"];
    });

    recoverFormRender();
    recoverFormListener();
  }
}

export default recovery;