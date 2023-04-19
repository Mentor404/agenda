exports.checkCsrfError = (err, req, res, next) => {
  if(err && err.code === 'EBADCSRFTOKEN') {
    return res.send('Bad credentials');
  }
  if(err && err.code !== 'EBADCSRFTOKEN') {
    return res.send("Something's gone wrong");
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}
