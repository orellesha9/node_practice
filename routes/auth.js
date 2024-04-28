import express from 'express';
import * as controllers from '../controllers/authControllers.js';
import { authenticate } from '../midlewares/validateUser.js';

const authRouter = express.Router();

authRouter.post('/signup', controllers.signUp);

authRouter.post('/login', controllers.logIn);

authRouter.get('/current', authenticate, async (req, res, next) => {
  const { password, ...rest } = req.user._doc;
  res.json(rest);
});

authRouter.post("/password", controllers.sendEmailToUpdatePassword)

export default authRouter;
