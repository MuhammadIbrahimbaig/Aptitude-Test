const Otp = require("../Collection/OtpSchema");
const { default: sendEmail } = require("./sendMails");

function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
  return otp.toString();
}
const SendingOtpUserVerify = async (email) => {
  try {
    const otp = generateOTP();
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 10); // Set OTP expiration time to 10 minutes

    const newOtp = new Otp({
      email,
      otp,
      expirationTime,
    });
    await newOtp.save();

    await sendEmail({
      to: email,
      subject: "Hotel Management Sent Otp Code",
      message: `
      <!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>One-Time Verification Code</title>
                    </head>
                    <body style="font-family: Arial, sans-serif;">
                    <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
                        <div style="max-width: 600px; text-align: center; margin: 0 auto; padding: 20px; border: 1px solid #ccc;">
                            <h1 style="color:rgb(231, 219, 8); font-size: 36px;">Hotel Management</h1>
                            <h1 style="color: #000; font-size: 20px;">Action Required: One-Time Verification Code</h1>
                            <p style="color: #777; font-size: 16px;">You are receiving this email because a request was made for a one-time code that can be used for authentication.</p>
                            <p style="color: #777; font-size: 16px;">Please enter the following code for verification:</p>
                            <p style="font-size: 36px; color: #333; margin: 10px 0;">${otp}</p>                           
                        </div>
                    </div>
                    </body>
                    </html>    `,
    });

    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return error
  }
};

module.exports=SendingOtpUserVerify