import { Injectable } from "@nestjs/common";
import { SentMessageInfo } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { smtpSettings } from "src/settings";

import { User } from "src/users/user.entity";
import { passworRecoveryTemplate } from "./templates/email.recover.password.template";
import { registrationTemplate } from "./templates/email.welcome.template";
import setupTransporter from "./utils/email.transporter";


@Injectable()
export class EmailService {
  constructor() {
  }
  private readonly defaultSender = smtpSettings.AUTH_USER;
  private transporter = setupTransporter();

  async send(mailOptions: Mail.Options): Promise<SentMessageInfo> {
    return this.transporter.sendMail(mailOptions);
  }
  /**
   * Envía correo de aviso de alta de usuario en el sistema.
   * @param user Usuario creado
   */
  async sendUserRegistration(user: User): Promise<SentMessageInfo> {
    return this.send({
      to: user.email,
      from: this.defaultSender,
      subject: "Bienvenido a " + "Real Market",
      html: registrationTemplate(user)
    })
  }

  /**
   *  Envia correo con el reset key al usuario que lo solicita
   * @param user 
   * @param resetKey 
   * @returns 
   */
  async sendPasswordRecovery(user: User, resetKey: number): Promise<SentMessageInfo> {
    return this.send({
      to: user.email,
      from: this.defaultSender,
      subject: "Recupere su contraseña en " + "Real Market",
      html: passworRecoveryTemplate(user, resetKey)
    })
  }
}