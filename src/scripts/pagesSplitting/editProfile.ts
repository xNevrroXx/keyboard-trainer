// types
import {IMatchPagesUrl} from "../types";

function editProfile(MATCH_PAGES_URL: IMatchPagesUrl) {
  const uploadFileBtn = document.querySelector(".button_upload-file");
  const uploadFileInput = document.querySelector("input[type='file']");

  uploadFileBtn.addEventListener("click", (event) => {
    uploadFileInput.dispatchEvent(new MouseEvent("click"));
  })
}

export default editProfile;