import Joi from "joi";
import { tlds } from "@hapi/tlds";

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*()])(?=.{8,})"
);

export const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required().messages({
    "string.pattern.base":
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!.@#$%^&*())",
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
});

export const signUpSchema = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: tlds } })
    .required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required().messages({
    "string.pattern.base":
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!.@#$%^&*())",
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
});
