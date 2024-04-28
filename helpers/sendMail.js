import nodemailer from "nodemailer"
import {envConfige} from "../envConfige.js"

const {UKR_NET_PASSWORD, UKR_NET_FROM} = envConfige;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
        user: UKR_NET_FROM,
        pass: UKR_NET_PASSWORD
    }
}

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async ({email, subjectText, href}) => {
    const emailData = {
        to: email,
        from: UKR_NET_FROM,
        subject: subjectText,
        html: `<a target="_blank" href="${href}">Click to update password</a>`
    }

    await transport.sendMail(emailData)
}

export default sendEmail;


