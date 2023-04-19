exports.contactsController = function (req, res) {
  res.render("contacts");
};

exports.contactsPost = function (req, res) {
  res.send("Olá, sou a rota POST 🙂 do /contacts");
};
