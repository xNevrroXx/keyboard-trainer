// own modules
import validate from "./validate";
import {register, signIn} from "../services/services";
import form from "./form";
// types
import {IDataLogin, IDataRegister} from "../types";
// general statisticData
import {MATCH_PAGES_URL} from "../generalData";

function loginFormListener() {
  const signInFormElem = document.querySelector("#sign-in"),
    registerFormElem = document.querySelector("#register");

  const formBindSignIn = form.bind(signInFormElem,
    async (data: IDataLogin) => await validate(data, "signIn"),
    async (data: IDataLogin) => await signIn(data),
    () => window.location.href = MATCH_PAGES_URL["testing"].pathname
  );
  const formBindRegister = form.bind(registerFormElem,
    (data: IDataRegister) => validate(data,"register"),
    async (data: IDataRegister) => await register(data),
    async (data: IDataLogin) => {
      try {
        await signIn(data);
        window.location.href = MATCH_PAGES_URL["testing"].pathname;
      }
      catch (error) {
        window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"];
      }
    }
  );
  signInFormElem.addEventListener("submit", formBindSignIn);
  registerFormElem.addEventListener("submit", formBindRegister);
}

export default loginFormListener;