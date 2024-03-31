import express from 'express';
import * as controllers from '../controllers/authControllers.js';
import { authenticate } from '../midlewares/validateUser.js';

const authRouter = express.Router();

authRouter.post('/signup', controllers.signUp);

authRouter.post('/login', controllers.logIn);

authRouter.get('/current', authenticate, async (req, res, next) => {
  const { password, ...rest } = req.user._doc;
  console.dir(req.user);
  res.json(rest);
});

export default authRouter;
