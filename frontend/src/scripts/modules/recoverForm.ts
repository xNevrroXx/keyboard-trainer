import validate from "./validate";
import {recover} from "../services";

function recoverForm() {
  const recoverFormElem = document.querySelector("#recover");

  recoverFormElem.addEventListener("submit", async function (event: Event) {
    event.preventDefault();
    const formData = new FormData(this);

    const data: any = {};
    formData.forEach((value, key) => {
      data[key] = value;
    })
    const errors = validate(data, false, false);

    if (Object.keys(errors).length === 0) {
      console.log("send to recover: ", data)
      recover(data);
    } else {
      // todo show errors
    }
  }) // end sign in
}

export default recoverForm;