// third-party modules
import axios from "axios";
// own modules
import validate from "./validate";
import {register, signIn} from "../services";
// types
import {backendUrls} from "../types";

function loginFormListener() {
  const signInFormElem = document.querySelector("#sign-in"),
    registerFormElem = document.querySelector("#register");

  signInFormElem.addEventListener("submit", async function (event: Event) {
    event.preventDefault();
    const formData = new FormData(this);

    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    })
    const errors = validate(data, false, true);

    if (Object.keys(errors).length === 0) {
      signIn(data);
    } else {
      // todo show errors
    }
  }) // end sign in

  registerFormElem.addEventListener("submit", async function (event: Event) {
    event.preventDefault();
    const formData = new FormData(this);

    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    })
    const errors = validate(data,true, true);

    if (Object.keys(errors).length === 0) {
      register(data);
    } else {
      // todo show errors
    }
  }) // end register


}

export default loginFormListener;