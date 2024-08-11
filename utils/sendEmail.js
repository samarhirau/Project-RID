

// const nodemailer = require('nodemailer');
// const dotenv = require('dotenv');
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: process.env.SMTP_PORT === '465', // true for port 465, false for port 587
//   auth: {
//     user: process.env.SMTP_USERNAME,
//     pass: process.env.SMTP_PASSWORD
//   }
// });

// const sendEmail = async (to, subject, text) => {
//   const mailOptions = {
//     from: process.env.SMTP_FROM_EMAIL,
//     to,
//     subject,
//     html: text
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', info.response);
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error; // Re-throw error to handle it in the calling function
//   }
// };

// module.exports = sendEmail;
const nodemailer = require('nodemailer');
require('dotenv').config(); // To access environment variables

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., 'smtp.gmail.com'
    port: parseInt(process.env.SMTP_PORT, 10), // e.g., 587 for Gmail
    secure: process.env.SMTP_PORT === '465', // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});

// Function to send an email
const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text // plain text body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

module.exports = { sendEmail };
