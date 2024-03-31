import User from '../models/User.js';

export const signUp = body => User.create(body);

export const logIn = email => User.findOne({ email });

export const findUserById = id => User.findById(id);
