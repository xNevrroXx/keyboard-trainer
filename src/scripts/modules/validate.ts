// third-party modules
import {number, object, ref, string, ValidationError} from "yup";
// types
// own types
import {TMainSchemas, TNameComplexSchemas,} from "../types";

/**
 * TransformYupErrorsIntoObject
 *
 * @description Transform the useless yup error into a usable validation object
 * @param {ValidationError} errors Yup validation errors
 * @returns {Record<string, string>} Validation errors
 */
export const transformYupErrorsIntoObject = (errors: ValidationError): Record<string, string> => {
  const validationErrors: Record<string, string> = {};

  errors.inner.forEach((error: any) => {
    if (error.path !== undefined && !validationErrors.hasOwnProperty(error.path)) {
      validationErrors[error.path] = error.errors[0];
    }
  });

  return validationErrors;
};

const mainSchemas: TMainSchemas = {
  name: string().ensure().required("Name is obligatory").min(2, "Name is too short").matches(/^[a-zа-яё]+$/ig, "May include only letters"),
  email: string().ensure().required("Email is obligatory").email("Email is incorrect"),
  password: string()
    .ensure()
    .required("Password is obligatory")
    .min(6, "Password is too short")
    .max(16, "Password is too long")
    .matches(/^(?=.*[0-9])(?=.*[(!@#$%^&*])[a-zA-Z0-9(!@#$%^&*]{6,16}$/, "Password must contain one of the following characters: (!@#$%^&*"),
  temporaryCode: number().required("Code is obligatory. It has been sent to your email address."),
}

const complexSchemas = {
  signIn: object({
    email: mainSchemas.email,
    password: mainSchemas.password
  }),
  register: object({
    name: mainSchemas.name,
    email: mainSchemas.email,
    password: mainSchemas.password
  }),
  passwordConfirmation: object({
    password: mainSchemas.password,
    repeatPassword: string()
      .required("Please retype your password")
      .oneOf([ref("password")], "Password must match")
  }),
  changeMainData: object({
    name: mainSchemas.name,
    email: mainSchemas.email
  }),
  email: object({
    email: mainSchemas.email
  }),
  temporaryCode: object({
    temporaryCode: mainSchemas.temporaryCode
  }),
}

async function validate(data: any, nameSchema: TNameComplexSchemas) {
  try {
    await complexSchemas[nameSchema].validate(data, {abortEarly: false});
  }
  catch (errors) {
    return transformYupErrorsIntoObject(errors);
  }
}

export default validate;