import nodemailer from "nodemailer";
import user from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await user.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await user.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "361bf27c88020c",
        pass: "2a753fd7799ae2",
      },
    }); //TODO: add this to env variables

    const mailOptions = {
      from: `uddhav@gmail.com`,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
                <p>Click <a href="${process.env.DOMAIN!}/verifyemail?token=${hashedToken}">here</a> 
                    to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}. 
                    This link will expire in one hour.
                    or copy and paste the following URL in your browser. <br/>
                    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                </p>
            `,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
