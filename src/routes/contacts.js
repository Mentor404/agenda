const express = require("express");
const route = express.Router();
const { contactsController, contactsPost } = require("../controllers/contactsController");
const { contactsRegisterController, contactsRegisterPost } = require("../controllers/contactsRegisterController");
const { contactsEditController, contactsEditPost } = require("../controllers/contactsEditController");
const { contactsRemoveController } = require("../controllers/contactsRemoveController");
const { loggedMiddleware } = require('../middlewares/loggedMiddleware')


route.get('/', loggedMiddleware, contactsController);

route.get('/register', loggedMiddleware, contactsRegisterController);
route.post('/register', loggedMiddleware, contactsRegisterPost);

route.get('/edit', loggedMiddleware, contactsEditController);
route.post('/edit/:id', loggedMiddleware, contactsEditPost);
route.get('/edit/:id', loggedMiddleware, contactsEditController);

route.get('/remove/:id', loggedMiddleware, contactsRemoveController);


module.exports = route;
