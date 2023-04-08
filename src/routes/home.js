const express = require("express");
const route = express.Router();
const {homePage, postData} = require("../controllers/homeController");

route.get('/', homePage);
route.post('/', postData);

module.exports = route;
