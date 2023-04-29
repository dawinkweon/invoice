import { Invoice } from "@/models/Invoice";
import { timed } from "../performanceUtils";
const nodeMailer = require("nodemailer");

const mailAddress = process.env.MAIL_ADDRESS;
const mailPassword = process.env.MAIL_PASSWORD;

class EmailService {
  public async sendMail(filePath: string, invoice: Invoice): Promise<any> {
    const fn = async () => {
      const mail = nodeMailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 25,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: mailAddress,
          pass: mailPassword,
        },
      });

      const { email, emailSubject, emailBody } = invoice;

      const message = {
        from: mailAddress,
        to: email,
        subject: emailSubject,
        text: emailBody,
        html: "",
        attachments: [
          {
            filename: `${
              invoice.type.charAt(0).toUpperCase() +
              invoice.type.slice(1).toLocaleLowerCase()
            } - Young's Garden Services.pdf`,
            path: filePath,
          },
        ],
      };

      console.log(`Sending mail with message: ${JSON.stringify(message)}`);

      return mail.sendMail(message);
    };
    return timed(fn, "sendEmail");
  }
}

export default EmailService;
