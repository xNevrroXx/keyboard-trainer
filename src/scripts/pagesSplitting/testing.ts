// own modules
import {authenticate, statisticDataPost} from "../services/services";
import initTesting from "../modules/initTesting";
// general statisticData
import {MATCH_PAGES_URL} from "../generalData";
import {IStatisticWithText} from "../types";

async function testing() {
  try {
    await authenticate();

    initTesting(async (statisticWithText: IStatisticWithText) => {
      await statisticDataPost(statisticWithText);
      window.location.href = MATCH_PAGES_URL["results"].pathname
    });
  } catch {
    // todo!!! try temporarily saving the test values in the backend. And save to DB this one when user sign-in/register
    // todo send statisticData to db

    window.location.href = MATCH_PAGES_URL["login"].pathname;
  }
}

export default testing;