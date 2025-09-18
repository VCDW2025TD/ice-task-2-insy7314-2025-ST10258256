const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Create JWT 
const createToken = (user) => 
    jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '1h'});

//Register a new user
exports.register = async (req, res) => {
    const {email, password} = req.body;
    try{
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({message: 'User already exists'});

        const user = await User.create({email, password});
        const token = createToken(user._id);
        res.status(201).json({token});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
};

// Login in an existing user
exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = createToken(user._id);
        res.json({token});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
};