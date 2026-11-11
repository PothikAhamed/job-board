const nodemailer = require("nodemailer");

const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>

<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:Arial,Helvetica,sans-serif;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:35px 12px;">
        <tr>
            <td align="center">

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:500px;background-color:#ffffff;border-radius:16px;overflow:hidden;">

                    <tr>
                        <td style="background-color:#17172f;padding:28px 30px;">
                            <h1 style="margin:0;color:#ffffff;font-size:25px;font-weight:800;">
                                YourBrand<span style="color:#8b7cff;">.</span>
                            </h1>
                            <p style="margin:8px 0 0;color:#b8b8d0;font-size:12px;letter-spacing:1.5px;">
                                SECURE ACCOUNT VERIFICATION
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:34px 28px 28px;">

                            <p style="display:inline-block;background-color:#eeebff;border-radius:20px;padding:8px 13px;color:#5b45d6;font-size:11px;font-weight:700;letter-spacing:1px;">
                                EMAIL VERIFICATION
                            </p>

                            <h2 style="margin:22px 0 12px;color:#17172f;font-size:28px;line-height:1.3;">
                                One quick step to get you started.
                            </h2>

                            <p style="margin:0;color:#686880;font-size:14px;line-height:1.9;">
                                Hello there,<br><br>
                                Thanks for joining YourBrand. Please use the one-time password below to verify your email address and complete your registration.
                            </p>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:26px;background-color:#f5f3ff;border:1px solid #e5e0ff;border-radius:14px;">
                                <tr>
                                    <td align="center" style="padding:27px 12px;">
                                        <p style="margin:0 0 15px;color:#7563d9;font-size:11px;font-weight:700;letter-spacing:3px;">
                                            YOUR VERIFICATION CODE
                                        </p>

                                        <p style="margin:0;color:#4030a5;font-size:35px;line-height:1.5;font-weight:800;letter-spacing:8px;">
                                            ${otp}
                                        </p>

                                        <p style="margin:18px 0 0;color:#77758d;font-size:12px;">
                                            Valid for <strong style="color:#5141bb;">5 minutes</strong>
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:22px;background-color:#f0fdf4;border-radius:10px;">
                                <tr>
                                    <td style="border-left:4px solid #22c55e;padding:16px 15px;">
                                        <p style="margin:0 0 6px;color:#166534;font-size:13px;font-weight:700;">
                                            Keep your account secure
                                        </p>
                                        <p style="margin:0;color:#4b6355;font-size:12px;line-height:1.8;">
                                            Never share this code with anyone. Our team will never ask you to disclose your OTP.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin:23px 0 0;color:#85859a;font-size:12px;line-height:1.8;">
                                Didn't request this verification code? You can safely ignore this email.
                            </p>

                            <p style="margin:24px 0 0;color:#53536b;font-size:13px;line-height:1.8;">
                                Best regards,<br>
                                <strong style="color:#17172f;">The YourBrand Team</strong>
                            </p>

                        </td>
                    </tr>

                    <tr>
                        <td align="center" style="background-color:#fafaff;border-top:1px solid #eeeef5;padding:22px 20px;">
                            <p style="margin:0 0 7px;color:#85859a;font-size:11px;line-height:1.7;">
                                This is an automated message. Please do not reply.
                            </p>
                            <p style="margin:0;color:#a1a1b3;font-size:11px;">
                                © ${new Date().getFullYear()} YourBrand. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>

                <p style="margin:17px 0 0;color:#a1a1b3;font-size:10px;text-align:center;">
                    A safer experience starts with verified email.
                </p>

            </td>
        </tr>
    </table>

</body>
</html>
`;

exports.sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: "pothikahamed5@gmail.com",
            subject: "Your YourBrand Verification Code",
            html: otpEmailTemplate(otp)
        });

        console.log("Message sent:", info.messageId);
        return info;

    } catch (err) {
        console.log("Error while sending mail:", err);
        throw err;
    }
};