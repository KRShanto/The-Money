"use server";

import { v4 as uuidv4 } from "uuid";
import { User } from "@/models/user";
import { dbConnect } from "@/lib/dbConnect";
import { createTransport } from "nodemailer";

// Create a reset token and send it to the user's email
// Save the reset token to the database
export async function createResetToken(email: string) {
  await dbConnect();

  const user = await User.findOne({ email });

  if (!user) {
    return {
      error: `User not found with email ${email}`,
    };
  }

  const resetToken = uuidv4();

  user.resetToken = resetToken;
  user.resetTokenExpires = Date.now() + 3600000; // 1 hour

  await user.save();

  // TODO: create reusable function for sending emails

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Reset your password",
    // TODO: better email template
    html: `
        <div>
            <h1>Reset your password</h1>
            <p>Click <a href="http://localhost:3000/reset?token=${resetToken}">here</a> to reset your password</p>
        </div>
    `,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    }
  });

  return {
    success: true,
  };
}
