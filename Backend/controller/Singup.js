const CryptoJS = require('crypto-js');
const User = require('../Model/SingupModel');

const singupHandler = async (req, res) => {
    try {
        const { name, number, email, password } = req.body;

        // Check if required fields are provided
        if (!name || !number || !email || !password) {
            return res.status(400).json({ message: 'Name, number, email, and password are required fields.' });
        }

        // Check if a user with the same email or number already exists
        const existingUser = await User.findOne({ $or: [{ email }, { number }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with the provided email or number already exists.' });
        }

        // Encrypt the password
        const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY).toString();

        const newUser = new User({
            name,
            number,
            email,
            password: encryptedPassword,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        if (error.code === 11000) {
            // Handle duplicate key error
            return res.status(400).json({ message: 'Duplicate key error. User with the same email or number already exists.' });
        } else {
            console.error(error);
            return res.status(500).json({ message: 'Error creating a user' });
        }
    }
};

module.exports = singupHandler;
