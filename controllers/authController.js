

const User = require('../models/user');
const bcrypt = require('bcrypt');
const { storeOTP, validateOTP } = require('../utils/otpUtils');
const { sendEmail } = require('../utils/sendEmail');

exports.loginUser = async (req, res) => {
    try{
        const check = await User.findOne({email:req.body.email});
        const ispasswordMatch = await bcrypt.compare(req.body.password, check.password);
        const roleselect = await User.findOne({role:req.body.role});
        console.log("role find in database:",roleselect);
          console.log(ispasswordMatch)
        console.log(check.email)
         if (check) {
             if (ispasswordMatch) {
                if (roleselect && roleselect.role === 'organisation') {
                    res.redirect("/organisation")
                } else if (roleselect && roleselect.role === 'teacher') {
                  res.redirect("/teacher") 
                } else if (roleselect && roleselect.role === 'student') {
                    res.redirect("/student")
                } else {
                    res.send("Role not recognized.");
                }
            } else {
               res.send("Incorrect password.");
            }
        } else {
           res.send("Name not recognized.");
        }
    }catch{
        res.send("wrong details")
    }

   
};


exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const isValidOTP = await validateOTP(email, otp);
        if (!isValidOTP) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await storeOTP(email, otp);

        const message = `<p>Your OTP is ${otp}. It will expire in 10 minutes.</p>`;
        await sendEmail(email, 'Password Reset OTP', message);

        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
    }

    // Validate OTP
    const isValidOTP = validateOTP(email, otp);
    if (!isValidOTP) {
        return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    try {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        user.password = hashedPassword;
        await user.save();

        // Respond with success
        res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Error resetting password' });
    }
};

