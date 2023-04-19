const Login = require("../models/LoginModel");
exports.loginController = function (req, res) {
  if(req.session.user) {
    return res.redirect('/contacts');
  } else {
    return res.render("login");
  }
};

exports.loginPost = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.enter();

    if(login.errors.length > 0) {
      req.flash("errors",login.errors);
      req.session.save(function () {
        res.redirect('back');
      });
      return;
    }

    req.flash("successes", 'Login realizado com sucesso');
    req.session.user = login.user;
    req.session.save(function () {
      res.redirect('/contacts');
    });
  } catch (e) {
    console.log(e);
  }
};
