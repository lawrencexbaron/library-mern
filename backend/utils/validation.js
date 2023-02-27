const joi = require("joi");

// baseOption
const baseOption = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
  errors: {
    wrap: {
      label: "",
    },
  },
};

// validateBook
const bookValidation = (data) => {
  const schema = joi.object({
    title: joi.string().required().messages({
      "string.required": "Title is required",
      "string.empty": "Title is required",
    }),
    author: joi.string().required().messages({
      "string.required": "Author is required",
      "string.empty": "Author is required",
    }),
    pages: joi.number().required().messages({
      "number.required": "Pages is required",
      "number.empty": "Pages is required",
    }),
    genre: joi.string().required().messages({
      "string.required": "Genre is required",
      "string.empty": "Genre is required",
    }),
    price: joi.number().required().messages({
      "number.required": "Price is required",
      "number.empty": "Price is required",
      "number.base": "Price must be a number",
    }),
    publisher: joi.string().required().messages({
      "string.required": "Publisher is required",
      "string.empty": "Publisher is required",
    }),
  });
  return schema.validate(data, baseOption);
};

// Register Validation
const registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required().messages({
      "string.required": "Name is required",
      "string.empty": "Name is required",
    }),
    email: joi.string().required().email().messages({
      "string.email": "Email must be a valid email",
      "string.required": "Email is required",
      "string.empty": "Email is required",
    }),
    password: joi.string().required().min(6).messages({
      "string.min": "Password must be at least 6 characters",
      "string.required": "Password is required",
      "string.empty": "Password is required",
    }),
    role: joi.string(),
  });

  return schema.validate(data, baseOption);
};

// Login Validation
const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().required().email().messages({
      "string.email": "Email must be a valid email",
      "string.required": "Email is required",
      "string.empty": "Email is required",
    }),
    password: joi.string().required().min(6).messages({
      "string.min": "Password must be at least 6 characters",
      "string.required": "Password is required",
      "string.empty": "Password is required",
    }),
  });

  return schema.validate(data, baseOption);
};

module.exports = {
  bookValidation,
  registerValidation,
  loginValidation,
};
