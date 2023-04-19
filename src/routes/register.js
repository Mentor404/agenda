const express = require("express");
const route = express.Router();
const {registerController, registerPost} = require("../controllers/registerController");

route.get('/', registerController);
route.post('/', registerPost);

module.exports = route;
