var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// own modules
import validate from "./validate";
import { register, signIn } from "../services";
import form from "./form";
function loginFormListener() {
    const signInFormElem = document.querySelector("#sign-in"), registerFormElem = document.querySelector("#register");
    const formBindSignIn = form.bind(signInFormElem, (data) => validate(data, false, true, true, false), (data) => __awaiter(this, void 0, void 0, function* () { return yield signIn(data); }), () => { }, false, false, false);
    const formBindRegister = form.bind(registerFormElem, (data) => validate(data, true, true, true, false), (data) => __awaiter(this, void 0, void 0, function* () { return yield register(data); }), () => { }, false, false, false);
    signInFormElem.addEventListener("submit", formBindSignIn);
    registerFormElem.addEventListener("submit", formBindRegister);
}
export default loginFormListener;
