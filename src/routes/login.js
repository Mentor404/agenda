const express = require("express");
const route = express.Router();
const {loginController, loginPost} = require("../controllers/loginController");

route.get('/', loginController);
route.post('/', loginPost);

module.exports = route;
