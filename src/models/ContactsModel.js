const mongoose = require("mongoose");
const validator = require("validator");
const Register = require("../models/RegisterModel");

const ContactsSchema = new mongoose.Schema({
  cname: { type: String, required: true },
  cphone: { type: String, required: true },
  cemail: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register",
    required: true,
  },
});

const ContactsModel = mongoose.model("Contacts", ContactsSchema);

class Contacts {
  constructor(body, user) {
    this.body = body;
    this.errors = [];
    this.contact = null;
    this.user = user;
  }

  static async findId(id) {
    // métodos static não podem acessar this e outros métodos da classe.
    if (typeof id !== "string") {
      return;
    }

    let contact;
    contact = await ContactsModel.findById(id);
    return contact;
  }

  static async listContacts(user) {
    const contacts = await ContactsModel.find({
      createdBy: user._id,
    }).sort({
      createdAt: -1,
    });
    return contacts;
  }

  static async remove(id) {
    if (typeof id !== "string") {
      return;
    }

    const contact = await ContactsModel.findOneAndDelete({_id: id});
    return contact;
  }

  async contactExists() {
    const contact = await ContactsModel.findOne({
      cname: this.body.cname,
    });

    if (contact) {
      this.errors.push(
        `O contato ${this.body.cname} já existe. <a href="/contacts/edit/${contact._id}" class="underline">Acessar</a>`
      );
    }
  }

  async register() {
    this.validate();

    if (this.errors.length > 0) return;

    await this.contactExists();
    if (this.errors.length > 0) return;

    this.contact = await ContactsModel.create(this.body);
  }

  validate() {
    this.sanitize();

    if (this.body.cname.length === 0) {
      this.errors.push("O usuário precisa ser informado.");
    }

    if (this.body.cphone.length === 0) {
      this.errors.push("O telefone precisa ser informado.");
    }
    const phoneRegex =
      /^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/;
    if (!phoneRegex.test(this.body.cphone)) {
      this.errors.push("Telefone inválido.");
    }

    if (this.body.cemail.length === 0) {
      this.errors.push("O email precisa ser informado.");
    }

    if (!validator.isEmail(this.body.cemail)) {
      this.errors.push("Email inválido.");
    }
  }

  sanitize() {
    for (const key in this.body) {
      if (typeof this.body[key] === "string") {
        this.body[key] = validator.escape(
          validator.stripLow(this.body[key].trim())
        );
      } else {
        this.body[key] = "";
      }
    }

    this.body.createdBy = this.user._id;
    this.body = {
      cname: this.body.cname,
      cphone: this.body.cphone,
      cemail: this.body.cemail,
      createdBy: this.body.createdBy,
    };
  }

  async edit(id) {
    if (typeof id !== "string") return;
    this.validate();
    if (this.errors.length > 0) return;
    this.contact = await ContactsModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  }
}

module.exports = Contacts;
