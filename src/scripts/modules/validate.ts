import {IDataErrors, IDataLogin, IDataRegister, IDataRecover__stageEmail, IDataRecover__stageCode, IDataRecover__stagePassword} from "../types";

function validate(
  data: IDataLogin | IDataRegister | IDataRecover__stageEmail | IDataRecover__stageCode | IDataRecover__stagePassword,
  isName: boolean,
  isPassword: boolean,
  isEmail: boolean,
  isRepeatPassword: boolean): IDataErrors
{
  const errors: IDataErrors = {};
  const nameRegex = /^[a-zа-яё]{2,}$/ig,
    emailRegex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordRegex = /^(?=.*[0-9])(?=.*[(!@#$%^&*])[a-zA-Z0-9(!@#$%^&*]{6,16}$/,
    codeRegex = /^\d{6}$/;

  if("name" in data && data["name"] && nameRegex.test(data["name"].trim())) {
  }
  else if (isName) {
    errors["name"] = "Name incorrect";
  }

  if("email" in data && data["email"] && emailRegex.test(data["email"].trim())) {
  }
  else if (isEmail) {
    errors["email"] = "Email incorrect";
  }

  if ("password" in data && data["password"] && passwordRegex.test(data["password"].trim())) {
  }
  else if (isPassword) {
    errors["password"] = "Should include (!@#$%^&*\r\nShould be greater than 6 characters"
  }

  if ("repeat-password" in data && data["repeat-password"] && passwordRegex.test(data["repeat-password"].trim())) {
  }
  else if (isRepeatPassword) {
    errors["repeat-password"] = "Should include !@#$%^&*\r\nShould be greater than 6 characters"
  }

  return errors;
}

export default validate;