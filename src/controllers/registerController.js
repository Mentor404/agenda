const { Register } = require("../models/RegisterModel");

exports.registerController = function (req, res) {
  if(req.session.user) {
    return res.redirect('/contacts');
  } else {
    return res.render("register");
  }
};

exports.registerPost = async function (req, res) {
  const register = new Register(req.body);
  await register.register();

  if(register.errors.length > 0) {
    req.flash("errors",register.errors);
    req.session.save(function () {
      res.redirect('back');
    });
    return;
  }

  req.flash("successes", 'Cadastro realizado com sucesso.');
  req.session.save(function () {
    res.redirect('/login');
  });
};
