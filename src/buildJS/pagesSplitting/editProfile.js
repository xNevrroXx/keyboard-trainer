function editProfile(MATCH_PAGES_URL) {
    const uploadFileBtn = document.querySelector(".button_upload-file");
    const uploadFileInput = document.querySelector("input[type='file']");
    uploadFileBtn.addEventListener("click", (event) => {
        uploadFileInput.dispatchEvent(new MouseEvent("click"));
    });
}
export default editProfile;
