// owm modules
import {authenticate, changeMainData, changePassword, deleteAccount, resetProgress} from "../services/services";
import initModal from "../modules/modal";
// general data
import {MATCH_PAGES_URL} from "../generalData";
import form from "../modules/form";
import validate from "../modules/validate";
import {IDataMainData, IDataPasswordConfirmation} from "../types";

async function editProfile() {
  try {
    const authenticateResponse = await authenticate();

    try {
      const uploadFileBtn = document.querySelector(".button_upload-file");
      const uploadFileInput = document.querySelector("input[type='file']");

      uploadFileBtn.addEventListener("click", (event) => {
        uploadFileInput.dispatchEvent(new MouseEvent("click"));
      })

      const editMainDataForm = document.querySelector(".edit-profile__form");
      const cancelChangeMainDataBtn = editMainDataForm.querySelector("button.edit-profile__cancel-btn");
      const formBindEditMainData = form.bind(editMainDataForm,
        async (data: IDataMainData) => validate(data, "changeMainData"),
        async (data: IDataMainData) => await changeMainData(data),
        () => {
            alert("Email and password has been saved");
            window.location.reload();
        }
      )
      editMainDataForm.addEventListener("submit", formBindEditMainData);
      cancelChangeMainDataBtn.addEventListener("click", () => window.location.reload());

      initModal({
        modalSelector: ".modal_delete-account",
        activeClass: "modal_active",
        triggerCloseSelector: ".modal__cancel-trigger",
        triggerOpenSelector: ".delete-account-btn",
        triggerConfirmSelector: ".agree",
        closeOnBackgroundSelector: ".modal_delete-account",
        callbackOnConfirm: async () => {
          try {
            await deleteAccount();
            alert("Account has been deleted");
            window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"];
          }
          catch (error) {
            console.log(error);
            alert("We catch some error. Please try later");
          }
        }
      });

      initModal({
        modalSelector: ".modal_reset-progress",
        activeClass: "modal_active",
        triggerCloseSelector: ".modal__cancel-trigger",
        triggerOpenSelector: ".reset-progress-btn",
        triggerConfirmSelector: ".agree",
        closeOnBackgroundSelector: ".modal_reset-progress",
        callbackOnConfirm: async () => {
          try {
            await resetProgress();

            const modalElem = document.querySelector(".modal_reset-progress");

            alert("Progress has been reset");
            modalElem.dispatchEvent(new CustomEvent("closeModal"));
          } catch (error) {
            console.log(error);
            alert("We catch some error. Please try later");
          }
        }
      });

      initModal({
        modalSelector: ".modal_change-password",
        activeClass: "modal_active",
        triggerCloseSelector: ".modal__cancel-trigger",
        triggerOpenSelector: ".change-password-btn",
        triggerConfirmSelector: ".agree",
        closeOnBackgroundSelector: ".modal_change-password",
        callbackOnConfirm: function() {
          const hiddenSubmitBtn = document.querySelector(".modal_change-password form > button.hidden");
          hiddenSubmitBtn.dispatchEvent(new MouseEvent("click"));
        },
        next: function() {
          const modalElem = document.querySelector(".modal_change-password");

          const formBindChangePassword = form.bind(modalElem.querySelector("form"),
            async (data: IDataPasswordConfirmation) => await validate(data, "passwordConfirmation"),
            (data: IDataPasswordConfirmation) => changePassword(data),
            () => {
              alert("Password has been changed");
              modalElem.dispatchEvent(new CustomEvent("closeModal"));
            }
          );

          const changePasswordFormElem = modalElem.querySelector("form");
          changePasswordFormElem.addEventListener("submit", formBindChangePassword);
        }
      })
    }
    catch (error) {
      console.log(error);
    }
  } catch {
    window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"];
  }
}

export default editProfile;