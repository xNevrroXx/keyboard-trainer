import {getProfile} from "../services";
import changeHeader from "./changeHeader";

async function authorize() {
  const data = await getProfile();

  console.log(data)
  if(data) {
    changeHeader(data.name);
  }
}

export default authorize;