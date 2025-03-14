import Joi from "joi";

export const editProfileSchema = Joi.object({
  userName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^\S.*$/, "Username must not start with spaces")
    .required()
    .messages({
      "string.empty": "Username is required",
      "string.min": "Username must be at least {#limit} characters",
      "string.max": "Username cannot exceed {#limit} characters",
      "any.required": "Username is required",
      "string.pattern.base": "Username must not start with spaces",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .pattern(/^\S*$/, "Email must not contain spaces")
    .messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
      "string.pattern.base": "Email must not contain spaces",
    }),

  profile: Joi.string().uri().allow(null, "").messages({
    "string.uri": "Profile image must be a valid URL",
  }),
});
