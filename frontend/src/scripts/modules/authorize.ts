import {getProfile} from "../services";
import changeHeader from "./changeHeader";

async function authorize() {
  const data = await getProfile();

  if(data) {
    changeHeader(data.name);
  }
}

export default authorize;