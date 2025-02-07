const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const router = express.Router();


router.post('/login', async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return res.status(200).json({ message: 'Login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
