const mongoose = require("mongoose");
const Validator = require("validator");
const bcryptjs = require("bcryptjs");
const {RegisterModel} = require("./RegisterModel");

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async enter () {
    this.validate();
    this.user = await RegisterModel.findOne({
      username: this.body.username,
    });

    if(!this.user) {
      this.errors.push("Usuário ou senha inválidos");
      return;
    }

    if(!bcryptjs.compareSync(this.body.password, this.user.password)){
      this.errors.push("Usuário ou senha inválidos");
      this.user = null;
      return;
    }

    const test = 'test';
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

module.exports = Login;
