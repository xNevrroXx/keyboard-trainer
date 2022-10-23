import {IMatchPagesUrl} from "../types";
import {authenticate} from "../services/services";
// general statisticData
import {MATCH_PAGES_URL} from "../generalData";

async function profile() {
  try {
    const authenticateResponse = await authenticate();

    console.log("authenticateResponse: ", authenticateResponse);
    // some logic
  } catch {
    window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"];
  }
}

export default profile;