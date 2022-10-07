var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import validate from "./validate";
import { recover } from "../services";
function recoverForm() {
    const recoverFormElem = document.querySelector("#recover");
    recoverFormElem.addEventListener("submit", function (event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            const errors = validate(data, false, false);
            if (Object.keys(errors).length === 0) {
                console.log("send to recover: ", data);
                recover(data);
            }
            else {
                // todo show errors
            }
        });
    }); // end sign in
}
export default recoverForm;
