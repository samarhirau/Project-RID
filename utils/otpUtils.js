// otpUtils.js

const otpStore = {}; // This should be a persistent store in a real application

function storeOTP(email, otp) {
    otpStore[email] = otp;
}

function validateOTP(email, otp) {
    return otpStore[email] === otp;
}

module.exports = { storeOTP, validateOTP };
