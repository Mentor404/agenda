exports.checkCsrfError = (err, req, res, next) => {
  if(err && err.code === 'EBADCSRFTOKEN') {
    return res.send('Bad credentials');
  }
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}
