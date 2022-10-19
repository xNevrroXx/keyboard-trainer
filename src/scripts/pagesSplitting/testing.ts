// types
import {IMatchPagesUrl} from "../types";
// own modules
import {authenticate} from "../services";
import initTesting from "../modules/initTesting";
// general data
import {MATCH_PAGES_URL} from "../generalData";

async function testing() {
  try {
    const authenticateResponse = await authenticate();

    initTesting(() => window.location.href = MATCH_PAGES_URL["results"].pathname);
    // some logic
  } catch {
    // todo!!! try temporarily saving testing the test values in the backend. And save to DB this one when user sign-in/register
    // todo send data to db

    initTesting(() => window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"]);
  }
}

export default testing;