const Joi = require("joi");

const PASSWORD_REGEX = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*()])(?=.{8,})"
);

const authRegister = Joi.object().keys({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
  recaptchaToken: Joi.string().required(),
});

const authLogin = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().pattern(PASSWORD_REGEX).min(8).required(),
  recaptchaToken: Joi.string().required(),
});

module.exports = {
  authRegister,
  authLogin,
};
