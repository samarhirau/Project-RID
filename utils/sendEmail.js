// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, message) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM_EMAIL, // sender address
    to: email, // recipient address
    subject: subject, // Subject line
    html: message, // html body
  });
};

module.exports = sendEmail;
