const express = require("express");
const route = express.Router();
const {contactsController, contactsPost} = require("../controllers/contactsController");
const {contactsRegisterController, contactsRegisterPost} = require("../controllers/contactsRegisterController");
const { loggedMiddleware } = require('../middlewares/loggedMiddleware')


route.get('/', contactsController);
route.post('/', contactsPost);

route.get('/register', loggedMiddleware, contactsRegisterController);
route.post('/register', loggedMiddleware, contactsRegisterPost);

module.exports = route;
