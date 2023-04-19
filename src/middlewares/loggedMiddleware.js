exports.loggedMiddleware = (req, res, next) => {
  if(req.session.user) {
    next();
  } else {
    req.flash('errors', 'Você precisa estar logado.');
    req.session.save(() => res.redirect('/login'));
  }
};
