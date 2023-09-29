import Joi from "joi";
import { tlds } from "@hapi/tlds";

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*()])(?=.{8,})"
);

export const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
});

export const signUpSchema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
});
