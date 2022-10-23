import {authenticate} from "../services/services";
import initTesting from "../modules/initTesting";
import setCustomTestingText from "../modules/setCustomTestingText";
// general statisticData
import {MATCH_PAGES_URL} from "../generalData";

async function testingCustom() {
  setCustomTestingText();

  try {
    const authenticateResponse = await authenticate();

    initTesting(() => window.location.href = MATCH_PAGES_URL["results"].pathname);
    // some logic
  } catch {
    // todo!!! try temporarily saving testing the test values in the backend. And save to DB this one when user sign-in/register
    // todo send statisticData to db

    initTesting(() => window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"]);
  }
}

export default testingCustom;