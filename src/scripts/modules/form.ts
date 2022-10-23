// types
import {
  IDataErrors,
  IDataLogin,
  IDataRecover__stageCode,
  IDataRecover__stageEmail,
  IDataRecover__stagePassword,
  IDataRegister
} from "../types";

// todo!!! unifying function
async function form(
  validateFunc: (data: IDataRecover__stageEmail | IDataRecover__stageCode | IDataRecover__stagePassword | IDataRegister | IDataLogin) => any,
  serviceFunc: (data: IDataRecover__stageEmail | IDataRecover__stageCode | IDataRecover__stagePassword | IDataRegister | IDataLogin) => Promise<any>,
  next: (email?: string, code?: string) => void
) {
  arguments[arguments.length-1].preventDefault();
  const formData = new FormData(this);

  const data: any = {};
  formData.forEach((value, key) => {
    data[key] = value;
  })
  const errors = await validateFunc(data);

  if (!errors || !Object.keys(errors).length || Object.keys(errors).length === 0) {
    try {
      const response = await serviceFunc(data);

      if (next) {
        next(data);
      }
    }
    catch (error) {
      alert(error.response.data.message);
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
      errorDescriptionElem.classList.add("error-description");
      errorDescriptionElem.innerHTML = errors[key];

      inputWithError.classList.add("input-with-error")
      inputWithError.after(errorDescriptionElem);
    }
  }
}

export default form;