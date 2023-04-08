exports.homePage = function (req, res) {
  res.render("home", {
    string: 'This is a String element',
    array: [1,2,3,4,5]
  });
};

exports.postData = function (req, res) {
  res.send("Olá, sou a rota POST 🙂");
};
