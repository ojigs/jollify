const Joi = require("joi");
const schemas = require("../util/schema");

const supportedMethods = ["post", "put", "patch", "delete"];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false,
};

const schemaValidator = (schemaPath, useJoiError = true) => {
  if (!schemas[schemaPath]) {
    throw new Error(`Schema not found for path: ${schemaPath}`);
  }

  return (req, res, next) => {
    const method = req.method.toLowerCase();

    if (!supportedMethods.includes(method)) {
      return next();
    }

    const { error, value } = schemas[schemaPath].validate(
      req.body,
      validationOptions
    );

    if (error) {
      const customError = {
        status: "failed",
        error: "Invalid request. Please review request and try again.",
      };

      const joiError = {
        status: "failed",
        error: {
          original: error._original,
          details: error.details.map(({ message, type }) => ({
            message: message.replace(/['"]/g, ""),
            type,
          })),
        },
      };

      return res.status(422).json(useJoiError ? joiError : customError);
    }

    // Validation successful
    req.body = value;
    return next();
  };
};

module.exports = schemaValidator;
