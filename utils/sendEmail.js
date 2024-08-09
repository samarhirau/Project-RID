// utils/sendEmail.js

const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets:false });


const sendEmail = (req,res,next) => {
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass:  process.env.SMTP_PASSWORD
    }
  });
  var mailOptions = {
    from:  process.env.SMTP_USERNAME,
    to: req.body.mail,
    subject: "OTP form RID",
    text: `your OTP is:${otp}`,

  };


  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      // console.log('Email sent: ' + info.response);
       res.send(`<form action='/verify-otp' method="post">
        <input type="text" name="otp" id="otp">
        <button type="submit">submit</button>
        </form>
         `);
    }
  });
}



module.exports = { sendEmail };
