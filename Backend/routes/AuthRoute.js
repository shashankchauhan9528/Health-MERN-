const express = require('express');

const singupHandler = require("../controller/Singup");
const loginHandler = require("../controller/Login");
const User = require('../Model/SingupModel');

const router = express.Router();

router.route("/singup")  
    .post(singupHandler)

router.route("/login")        
    .post(loginHandler)

module.exports = router;