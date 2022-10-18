// own modules
import validate from "./validate";
// types
import {
  IDataErrors,
  IDataLogin,
  IDataRecover__stageCode,
  IDataRecover__stageEmail,
  IDataRecover__stagePassword,
  IDataRegister
} from "../types";

async function form(
  validateFunc: (data: IDataRecover__stageEmail | IDataRecover__stageCode | IDataRecover__stagePassword | IDataRegister | IDataLogin) => IDataErrors,
  serviceFunc: (data: IDataRecover__stageEmail | IDataRecover__stageCode | IDataRecover__stagePassword | IDataRegister | IDataLogin) => Promise<any>,
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


      try {
        const response = await serviceFunc(data);

        if (response.response && response.response.status && (response.response.status < 200 || response.response.status >= 300)) {
          throw (response);
        }
        if (next) {
          next();
        }
      }
      catch (error) {
        alert(error.response.data.message)
      }
    }
    else if (isNeedEmail && isNeedCode) {
      data.email = window.location.search.match(/email=.*$/i)[0].slice(6);

      try {
        const response = await serviceFunc(data);

        if (response.response && response.response.status && (response.response.status < 200 || response.response.status >= 300)) {
          throw (response);
        }
        if (next) {
          next(data.email, data.code);
        }
      }
      catch (error) {
        alert(error.response.data.message);
      }
    }
    else if (isNeedEmail) {
      try {
        const response = await serviceFunc(data);

        if (response.response && response.response.status && (response.response.status < 200 || response.response.status >= 300)) {
          throw (response);
        }
        if (next) {
          next(data.email);
        }
      }
      catch (error) {
        alert(error.response.data.message);
      }
    }
    else {
      try {
        const response = await serviceFunc(data);

        console.log(response);
        if (response.response && response.response.status && (response.response.status < 200 || response.response.status >= 300)) {
          console.log("here")
          throw (response);
        }
        if (next) {
          next();
        }
      }
      catch (error) {
        console.log("error alert: ", error)
        alert(error.response.data.message);
      }
    }
  } else {
    this.querySelectorAll("input").forEach((inputElem: Element) => {
      inputElem.classList.remove("input-with-error");
    })
    this.querySelectorAll(".error-description").forEach((errorElem: Element) => {
      errorElem.remove();
    })
    for (const key of Object.keys(errors) as (keyof IDataErrors)[]) {
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