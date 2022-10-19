// types
import {IMatchPagesUrl} from "../types";
import {authenticate} from "../services";
// general data
import {MATCH_PAGES_URL} from "../generalData";

async function editProfile() {
  try {
    const authenticateResponse = await authenticate();

    const uploadFileBtn = document.querySelector(".button_upload-file");
    const uploadFileInput = document.querySelector("input[type='file']");

    uploadFileBtn.addEventListener("click", (event) => {
      uploadFileInput.dispatchEvent(new MouseEvent("click"));
    })
  } catch {
    window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"];
  }
}

export default editProfile;