// third-party modules
import axios from "axios";
// own modules
import validate from "./validate";
import {register, signIn} from "../services";
import form from "./form";
// types
import {dataLogin, dataRegister} from "../types";

function loginFormListener() {
  const signInFormElem = document.querySelector("#sign-in"),
    registerFormElem = document.querySelector("#register");

  const formBindSignIn = form.bind(signInFormElem,
    (data: dataLogin) => validate(data, false, true, true, false),
    async (data: dataLogin) => await signIn(data),
    () => {},
    false,
    false,
    false
  );
  const formBindRegister = form.bind(registerFormElem,
    (data: dataRegister) => validate(data,true, true, true, false),
    async (data: dataRegister) => await register(data),
    () => {},
    false,
    false,
    false
  );
  signInFormElem.addEventListener("submit", formBindSignIn);
  registerFormElem.addEventListener("submit", formBindRegister);
}

export default loginFormListener;