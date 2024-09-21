const express = require('express');
const { verifyToken } = require('../middleware/verifyToken');
const User = require('../models/user'); // Assuming User model exists

const app = express();


// Verify token and return user role
app.get('/api/verify-token', verifyToken, (req, res) => {
  // After passing through verifyToken, req.role and req.userId should be available
  try {
    if (req.role) {
      res.json({
        success: true,
        role: req.role, // Role from token
      });
    } else {
      res.status(403).json({ success: false, message: 'Role not found' });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

