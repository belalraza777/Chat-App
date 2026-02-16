const Joi = require("joi");

// Generic validation middleware
 
const validate = (schema) => {
  return (req, res, next) => {
    const options = {
      abortEarly: false,   // return all validation errors
      allowUnknown: true,  // ignore extra fields (useful with multer)
      stripUnknown: true,  // remove unknown fields
    };

    const { error, value } = schema.validate(req.body, options);

    if (error) {
      return res.status(400).json({
        success: false,
         errors: error.details.map((err) => err.message),
      });
    }

    req.body = value; // ✅ replace with validated and sanitized data
    next();
  };
};

/**
 * Joi schemas
 */
const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profileImage: Joi.object({
    url: Joi.string().uri().optional(),
    filename: Joi.string().optional(),
  }).optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(30).optional(),
});

module.exports = {
  validate,
  signupSchema,
  loginSchema,
  updateProfileSchema,
};
