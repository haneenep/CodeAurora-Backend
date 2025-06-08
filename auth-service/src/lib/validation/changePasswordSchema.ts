import Joi from "joi";

export const passwordChangeSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .pattern(/^\S*$/, 'Email must not contain spaces')
      .messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
        'string.pattern.base': 'Email must not contain spaces'
      }),
    
    currentPassword: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.empty': 'Current password is required',
        'string.min': 'Current password must be at least {#limit} characters',
        'any.required': 'Current password is required'
      }),
    
    newPassword: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
      .invalid(Joi.ref('currentPassword'))
      .required()
      .messages({
        'string.empty': 'New password is required',
        'string.min': 'New password must be at least {#limit} characters',
        'any.required': 'New password is required',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        'any.invalid': 'New password cannot be the same as current password'
      })
  });
  