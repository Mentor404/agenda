exports.messagesMiddleware = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.successes = req.flash('successes');
  res.locals.user = req.session.user;
  next();
};
