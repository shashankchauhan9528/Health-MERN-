const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require("../Model/SingupModel");

const loginHandler = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({ message: "Incorrect email" });
        }

        const decodedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        if (decodedPassword !== req.body.password) {
            return res.status(401).json({ message: "Incorrect Password" });
        }

        const { password, ...rest } = user._doc;
        const accessToken = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET);

        res.json({ accessToken });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = loginHandler;
