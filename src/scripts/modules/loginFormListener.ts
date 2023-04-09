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
        registerFormElem = document.querySelector("#register"),
        signInFormElemMobile = document.querySelector("#sign-in-mobile"),
        registerFormElemMobile = document.querySelector("#register-mobile");

    [signInFormElem, signInFormElemMobile].forEach(function (signInForm) {
        const bindSignIn = form.bind(signInForm,
            async (data: IDataLogin) => await validate(data, "signIn"),
            async (data: IDataLogin) => await signIn(data),
            () => window.location.href = MATCH_PAGES_URL["testing"].pathname
        );

        signInForm.addEventListener("submit", bindSignIn);
    });

    [registerFormElem, registerFormElemMobile].forEach(function (registerForm) {
        const bindRegister = form.bind(registerForm,
            (data: IDataRegister) => validate(data, "register"),
            async (data: IDataRegister) => await register(data),
            async (data: IDataLogin) => {
                try {
                    await signIn(data);
                    window.location.href = MATCH_PAGES_URL["testing"].pathname;
                } catch (error) {
                    window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"];
                }
            }
        )

        registerForm.addEventListener("submit", bindRegister);
    });
}

export default loginFormListener;


