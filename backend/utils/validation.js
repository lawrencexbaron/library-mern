const joi = require("joi");

// baseOption
const baseOption = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
};

// validateBook
const bookValidation = (data) => {
  const schema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    pages: joi.number().required(),
    genre: joi.string().required(),
    price: joi.number().required(),
    publisher: joi.string().required(),
  });
  return schema.validate(data, baseOption);
};

// validateUser
const userValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
    role: joi.string(),
  });

  return schema.validate(data, baseOption);
};

module.exports = {
  bookValidation,
  userValidation,
};
