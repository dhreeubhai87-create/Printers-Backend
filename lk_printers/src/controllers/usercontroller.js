const user = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const signup = async (req, res) => {
    try {
        const { businessName, username, email, phoneNumber, password, refCode, Country, state, district, city, pinCode, gstTax, fullAddress } = req.body;
        if (!businessName || !email || !username || !phoneNumber || !password || !Country || !state || !district || !city || !pinCode || !fullAddress) {
            return res.status(400).json({
                message: 'All fields are required'
            })
        }
        const existingUser = await user.findOne({ phoneNumber });
        const checkEmail = await user.findOne({ email });
        if (existingUser || checkEmail) {
            return res.status(400).json({
                message: 'User already exists with this phone number or email'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = new user({
            businessName,
            username,
            email,
            phoneNumber,
            password: hashedPassword,
            refCode,
            Country,
            state,
            district,
            city,
            pinCode,
            gstTax,
            fullAddress
        });
        await newuser.save();
        return res.status(201).json({
            message: 'User registered successfully',
            response: newuser
        })
    }
    catch (ex) {
        console.log(ex);
        return res.status(500).json({
            message: 'Internal Server Error',
        })
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            })
        }
        const existinguser = await user.findOne({ email });
        if (!existinguser) {
            return res.status(400).json({
                message: 'Invalid email or password'
            })
        }
        const isMatch = await bcrypt.compare(password, existinguser.password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Password is incorrect'
            })
        }
        const token = jwt.sign({ id: existinguser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            message: 'Login successful',
            response: existinguser,
            token: token
        });
    }
    catch (ex) {
        return res.status(500).json({
            message: 'Internal Server Error',
        });
    }
}

module.exports = { signup, login };