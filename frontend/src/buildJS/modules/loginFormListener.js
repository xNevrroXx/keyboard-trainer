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
function loginFormListener() {
    const signInFormElem = document.querySelector("#sign-in"), registerFormElem = document.querySelector("#register");
    signInFormElem.addEventListener("submit", function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            const errors = validate(data, false);
            if (Object.keys(errors).length === 0) {
                signIn(data);
            }
            else {
                // todo show errors
            }
        });
    }); // end sign in
    registerFormElem.addEventListener("submit", function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            const errors = validate(data, true);
            if (Object.keys(errors).length === 0) {
                register(data);
            }
            else {
                // todo show errors
            }
        });
    }); // end register
}
export default loginFormListener;
