const Contacts = require('../models/ContactsModel');

exports.contactsController = async function (req, res) {
  const contacts = await Contacts.listContacts(req.session.user);

  res.render("contacts", { contacts });
};
