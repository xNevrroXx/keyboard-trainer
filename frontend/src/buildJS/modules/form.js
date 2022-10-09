var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function form(validateFunc, serviceFunc, next, isNeedEmail, isNeedCode, bothCodeAndEmailRequest) {
    return __awaiter(this, arguments, void 0, function* () {
        arguments[arguments.length - 1].preventDefault();
        const formData = new FormData(this);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        const errors = validateFunc(data) || {};
        if (!errors || !Object.keys(errors).length || Object.keys(errors).length === 0) {
            if (bothCodeAndEmailRequest) {
                data.email = window.location.search.match(/email=.*$/i)[0].slice(6);
                data.code = window.location.search.match(/code=\d{6}/)[0].slice(5);
                serviceFunc(data)
                    .then((response) => {
                    next();
                })
                    .catch(error => {
                    alert(error.message);
                });
            }
            else if (isNeedEmail && isNeedCode) {
                data.email = window.location.search.match(/email=.*$/i)[0].slice(6);
                serviceFunc(data)
                    .then((response) => {
                    if (next) {
                        next(data.email, data.code);
                    }
                })
                    .catch(error => {
                    alert(error.message);
                });
            }
            else if (isNeedEmail) {
                serviceFunc(data)
                    .then((response) => {
                    if (next) {
                        next(data.email);
                    }
                })
                    .catch(error => {
                    alert(error.message);
                });
            }
            else {
                console.log("start sign in");
                serviceFunc(data)
                    .then((response) => {
                    if (next) {
                        console.log("response: ", response);
                        next();
                    }
                })
                    .catch(error => {
                    alert(error.message);
                });
            }
        }
        else {
            this.querySelectorAll("input").forEach((inputElem) => {
                inputElem.classList.remove("input-with-error");
            });
            this.querySelectorAll(".error-description").forEach((errorElem) => {
                errorElem.remove();
            });
            for (const key of Object.keys(errors)) {
                const inputWithError = this.querySelector(`input[name="${key}"]`);
                const errorDescriptionElem = document.createElement("div");
                errorDescriptionElem.classList.add("error-description");
                errorDescriptionElem.textContent = errors[key];
                inputWithError.classList.add("input-with-error");
                inputWithError.after(errorDescriptionElem);
            }
        }
    });
}
export default form;
