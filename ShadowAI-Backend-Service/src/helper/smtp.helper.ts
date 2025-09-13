/* eslint-disable prettier/prettier */
import nodemailer, { Transporter } from "nodemailer";
import { IEmailOptions } from "../interface/email.interface";
import { getEnvValue } from "../utils/env.utils";
import shadowAiLogger from "../libs/logger.libs";

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: getEnvValue("APP_EMAIL") as string,
        pass: getEnvValue("APP_PASSWORD") as string,
      },
    });
  }

  public async sendMail(options: IEmailOptions): Promise<void> {
    const mailOptions = {
      from: {
        name: "ShadowAI",
        address: getEnvValue("APP_EMAIL") as string,
      },
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      shadowAiLogger.info(`Email sent: ${info.messageId}`);
    } catch (error) {
      shadowAiLogger.error("Error sending email:", error);
    }
  }
}

const getEmailInstance = (): EmailService => {
  return new EmailService();
};

export default getEmailInstance
