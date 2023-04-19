const mongoose = require("mongoose");
const Validator = require("validator");

class Contacts {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }


  validate() {
    this.sanitize();

    if (this.body.username.length === 0) {
      this.errors.push("O usuário precisa ser informado.");
    }

    if (this.body.password.length === 0) {
      this.errors.push("A senha precisa ser informada.");
    }
  }

  sanitize() {
    for (const key in this.body) {
      if (typeof this.body[key] === "string") {
        this.body[key] = Validator.escape(
          Validator.stripLow(this.body[key].trim())
        );
      } else {
        this.body[key] = "";
      }
    }

    this.body = {
      username: this.body.username,
      password: this.body.password,
    };
  }
}

module.exports = Contacts;
