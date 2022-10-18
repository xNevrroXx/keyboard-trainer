// own modules
import validate from "./validate";
import {register, signIn} from "../services";
import form from "./form";
// types
import {IDataLogin, IDataRegister, IMatchPagesUrl} from "../types";

function loginFormListener(MATCH_PAGES_URL: IMatchPagesUrl) {
  const signInFormElem = document.querySelector("#sign-in"),
    registerFormElem = document.querySelector("#register");

  const formBindSignIn = form.bind(signInFormElem,
    (data: IDataLogin) => validate(data, false, true, true, false),
    async (data: IDataLogin) => await signIn(data),
    () => window.location.href = MATCH_PAGES_URL["testing"].pathname,
    false,
    false,
    false
  );
  const formBindRegister = form.bind(registerFormElem,
    (data: IDataRegister) => validate(data,true, true, true, false),
    async (data: IDataRegister) => await register(data),
    () => {},
    false,
    false,
    false
  );
  signInFormElem.addEventListener("submit", formBindSignIn);
  registerFormElem.addEventListener("submit", formBindRegister);
}

export default loginFormListener;