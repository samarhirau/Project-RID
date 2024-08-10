const sendEmail = require('./utils/sendEmail'); // Adjust path if necessary

sendEmail('test@example.com', 'Test Email', '<p>This is a test email sent from Nodemailer!</p>')
  .then(() => console.log('Test email sent successfully'))
  .catch(error => console.error('Test email failed:', error));
