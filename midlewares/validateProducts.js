import Joi from 'joi';
import { createError } from '../helpers/createError.js';

const updSchema = Joi.object({
  name: Joi.string().min(1),
  price: Joi.number().min(0),
});

const addSchema = Joi.object({
  name: Joi.string().min(1).required(),
  price: Joi.number().min(0).required(),
});

export const update = (req, res, next) => {
  try {
    const { error } = updSchema.validate(req.body);
    if (error) {
      throw createError(400, error.details[0].message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const add = (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw createError(400, error.details[0].message);
    }
    next();
  } catch (error) {
    next(error);
  }
};
