exports.exempleMiddleware = (req, res, next) => {
  res.locals.varLocal = 'Esta é a variavel local criada no middleware global';
  next();
};
