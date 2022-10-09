// own modules
import validate from "./validate";
// types
import {
  dataErrors,
  dataLogin,
  dataRecover__stageCode,
  dataRecover__stageEmail,
  dataRecover__stagePassword,
  dataRegister
} from "../types";

async function form(
  validateFunc: (data: dataRecover__stageEmail | dataRecover__stageCode | dataRecover__stagePassword | dataRegister | dataLogin) => dataErrors,
  serviceFunc: (data: dataRecover__stageEmail | dataRecover__stageCode | dataRecover__stagePassword | dataRegister | dataLogin) => Promise<any>,
  next: (email?: string, code?: string) => void,
  isNeedEmail?: boolean,
  isNeedCode?: boolean,
  bothCodeAndEmailRequest?: boolean
) {
  arguments[arguments.length-1].preventDefault();
  const formData = new FormData(this);

  const data: any = {};
  formData.forEach((value, key) => {
    data[key] = value;
  })
  const errors = validateFunc(data) || {};

  if (!errors || !Object.keys(errors).length || Object.keys(errors).length === 0) {
    if(bothCodeAndEmailRequest) {
      data.email = window.location.search.match(/email=.*$/i)[0].slice(6);
      data.code = window.location.search.match(/code=\d{6}/)[0].slice(5);

      serviceFunc(data)
        .then((response) => {
          next()
        })
        .catch(error => {
          alert(error.message)
        })
    }
    else if (isNeedEmail && isNeedCode) {
      data.email = window.location.search.match(/email=.*$/i)[0].slice(6);

      serviceFunc(data)
        .then((response) => {
          if (next) {
            next(data.email, data.code);
          }
        })
        .catch(error => {
          alert(error.message)
        });
    }
    else if (isNeedEmail) {
      serviceFunc(data)
        .then((response) => {
          if (next) {
            next(data.email);
          }
        })
        .catch(error => {
          alert(error.message)
        });
    }
    else {
      console.log("start sign in")
      serviceFunc(data)
        .then((response) => {
          if (next) {
            console.log("response: ", response)
            next();
          }
        })
        .catch(error => {
          alert(error.message)
        });
    }
  } else {
    this.querySelectorAll("input").forEach((inputElem: Element) => {
      inputElem.classList.remove("input-with-error");
    })
    this.querySelectorAll(".error-description").forEach((errorElem: Element) => {
      errorElem.remove();
    })
    for (const key of Object.keys(errors) as (keyof dataErrors)[]) {
      const inputWithError = this.querySelector(`input[name="${key}"]`);
      const errorDescriptionElem = document.createElement("div");
      errorDescriptionElem.classList.add("error-description")
      errorDescriptionElem.textContent = errors[key];

      inputWithError.classList.add("input-with-error")
      inputWithError.after(errorDescriptionElem);
    }
  }
}

export default form;