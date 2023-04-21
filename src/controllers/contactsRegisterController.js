const Contact = require('../models/ContactsModel')

exports.contactsRegisterController = function (req, res) {
  res.render("contactsRegister");
};

exports.contactsRegisterPost = async function (req, res) {
  try {
    const contact = new Contact(req.body, req.session.user);
    contact.user = req.session.user;
    await contact.register();

    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('successes', 'Contato registrado com sucesso.');
    req.session.save(() => res.redirect(`/contacts/edit/${contact.contact._id}`));
  } catch (err) {
    return res.send(err);
  }
};
