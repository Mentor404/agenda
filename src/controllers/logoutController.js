const Login = require("../models/LoginModel");
exports.logoutController = function (req, res) {
  req.session.destroy();
  res.redirect('/');
};
