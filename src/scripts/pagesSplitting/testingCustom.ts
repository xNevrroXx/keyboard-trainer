import {authenticate} from "../services";
import initTesting from "../modules/initTesting";
import setCustomTestingText from "../modules/setCustomTestingText";
// general data
import {MATCH_PAGES_URL} from "../generalData";

async function testingCustom() {
  try {
    const authenticateResponse = await authenticate();

    setCustomTestingText();
    initTesting(() => window.location.href = MATCH_PAGES_URL["results"].pathname);
    // some logic
  } catch {
    // todo!!! try temporarily saving testing the test values in the backend. And save to DB this one when user sign-in/register
    // todo send data to db

    initTesting(() => window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"]);
  }
}

export default testingCustom;