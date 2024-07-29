// Route to handle password reset
app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
  
    try {
      const user = await User.findOne({
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() }, // Ensure token is still valid
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
  
      // Update password and clear reset token
      user.password = newPassword; // Ensure you hash the password in a real application
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
  
      res.status(200).json({ message: 'Password successfully reset' });
    } catch (error) {
      res.status(500).json({ message: 'Error resetting password' });
    }
  });
  