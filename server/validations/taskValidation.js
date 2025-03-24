import Joi from 'joi';

//* Add Validation
export const createTaskValidation = Joi.object({
  title: Joi.string().required().max(100).messages({
    'string.base': 'Title should be a string',
    'string.empty': 'Title is required',
    'string.max': 'Title cannot be longer than 100 characters'
  }),
  description: Joi.string().optional().max(300).messages({
    'string.base': 'Description should be a string',
    'string.max': 'Description cannot be longer than 300 characters'
  }),
  completed: Joi.boolean().optional().default(false).messages({
    'boolean.base': 'Completed must be a boolean value'
  }),
  priority: Joi.string().valid('low', 'medium', 'high').optional().default('medium').messages({
    'string.base': 'Priority must be a string',
    'string.valid': 'Priority must be one of the following: low, medium, high'
  }),
});

//* Update Validation
export const updateTaskValidation = Joi.object({
  title: Joi.string().max(100).messages({
    'string.base': 'Title should be a string',
    'string.max': 'Title cannot be longer than 100 characters'
  }),
  description: Joi.string().optional().max(300).messages({
    'string.base': 'Description should be a string',
    'string.max': 'Description cannot be longer than 300 characters'
  }),
  completed: Joi.boolean().optional().messages({
    'boolean.base': 'Completed must be a boolean value'
  }),
  priority: Joi.string().valid('low', 'medium', 'high').optional().messages({
    'string.base': 'Priority must be a string',
    'string.valid': 'Priority must be one of the following: low, medium, high'
  }),
});
