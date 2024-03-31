import jwt from 'jsonwebtoken';
import { createError } from '../helpers/createError.js';
import { envConfige } from '../envConfige.js';
import { findUserById } from '../services/auth.js';

export const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  try {
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' && !token) {
      throw createError(401, 'No authorization');
    }
    const { id } = jwt.verify(token, envConfige.SECRET_KEY);
    const user = await findUserById(id);
    if (!user) {
      throw createError(401, 'No authorization');
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
