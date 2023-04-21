const Contact = require("../models/ContactsModel");

exports.contactsRemoveController = async function (req, res) {
  try {
    if(!req.params.id) return req.session.save(() => res.redirect('/contacts'));

    const contact = await Contact.remove(req.params.id);
    if(!contact) return req.session.save(() => res.redirect('/contacts'));

    req.flash('successes', 'Contato removido com sucesso.');
    req.session.save(() => res.redirect(`/contacts`));
  } catch (e) {
    return res.send(e);
  }
};
