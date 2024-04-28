import { createError } from "../helpers/createError.js";
import * as service from "../services/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envConfige } from "../envConfige.js";
import sendEmail from "../helpers/sendMail.js";

export const signUp = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await service.signUp({
            ...req.body,
            password: hashedPassword,
        });

        res.status(201).json({
            email: newUser.email,
            _id: newUser._id,
        });
    } catch (error) {
        next(error);
    }
};

export const logIn = async (req, res, next) => {
    try {
        const findUser = await service.logIn(req.body.email);
        if (!findUser) {
            throw createError(400, "Password or email wrong");
        }
        const isPasswordCompare = await bcrypt.compare(
            req.body.password,
            findUser.password
        );
        if (!isPasswordCompare) {
            throw createError(400, "Password or email wrong");
        }

        const token = jwt.sign({ id: findUser._id }, envConfige.SECRET_KEY, {
            expiresIn: "10h",
        });

        res.json({
            user: {
                name: findUser.name,
                email: findUser.email,
                _id: findUser._id,
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};

export const sendEmailToUpdatePassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await service.findUserByEmail(email);

        if (!user) {
            throw createError(404, "User not found");
        }

        const token = jwt.sign({ id: user._id }, envConfige.SECRET_KEY, {
          expiresIn: "10h",
      });

        await sendEmail({
            email,
            subjectText: "Update password",
            href: `${envConfige.FRONT_URL}/password.html?token=${token}`,
        });

        res.status(200).json({
            message: "Email send success",
        });
    } catch (error) {
        next(error);
    }
};

export const passwordUpdate = async (req, res, next) => {
    try {
        const { password } = req.body;
        const {_id} = req.user;

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await service.updatePassword({
            password: hashedPassword,
            id: _id
        });

        res.status(204).json({
            message: "Password updated success"
        });
    } catch (error) {
        next(error);
    }
};
