exports.contactsRegisterController = function (req, res) {
  res.render("contactsRegister");
};

exports.contactsRegisterPost = function (req, res) {
  res.send("Olá, sou a rota POST 🙂 do /contactsRegister");
};
