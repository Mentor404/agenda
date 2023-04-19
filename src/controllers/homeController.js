exports.homePage = function (req, res) {
  res.render("home");
};

exports.postData = function (req, res) {
  res.send("Olá, sou a rota POST 🙂 do /");
};
