const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

//User Registration Route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
        console.error('Error during registation: ' + error.message);
        res.status(500).json({ message: 'Error registering user' });
    }
});

//User Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email not found ' });
        }

        //Compare the passwords
        const isMatchingPassword = await bcrypt.compare(password, user.password);
        if (!isMatchingPassword) {
            return res.status(400).json({ message: 'Invalid password please try again' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

module.exports = router;