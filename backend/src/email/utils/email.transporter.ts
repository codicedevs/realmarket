
import { createTransport } from "nodemailer";
import { smtpSettings } from "src/settings";

export default function setupTransporter() {

    console.log(smtpSettings.AUTH_PASS, smtpSettings.AUTH_USER)
    return createTransport({ // es una función proporcionada por la biblioteca nodemailer que se utiliza para crear un objeto de transporte de correo.
        host: smtpSettings.HOST,
        port: smtpSettings.PORT,
        secure: smtpSettings.SECURE,
        auth: {
            user: smtpSettings.AUTH_USER,
            pass: smtpSettings.AUTH_PASS,
        },
        tls: {
            rejectUnauthorized: false
        },
    });
}

