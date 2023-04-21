const Contact = require("../models/ContactsModel");

exports.contactsEditController = async function (req, res) {
  if (!req.params.id) return req.session.save(() => res.redirect('/contacts'));

  const contact = await Contact.findId(req.params.id);
  if (!contact) {
    return res.send("Algo deu errado");
  }

  res.render("contactsEdit", {
    contact,
  });
};

exports.contactsEditPost = async function (req, res) {
  try {
    if(!req.params.id) return req.session.save(() => res.redirect('/contacts'));

    const contact = new Contact(req.body, req.session.user);
    await contact.edit(req.params.id);

    if(contact.errors.length > 0) {
      req.flash('errors', contact.errors);
      req.session.save(() => res.redirect('back'));
      return;
    }

    req.flash('successes', 'Contato alterado com sucesso.');
    req.session.save(() => res.redirect(`/contacts/edit/${contact.contact._id}`));
  } catch (e) {
    return res.render(e);
  }
};
