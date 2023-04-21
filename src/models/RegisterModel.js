const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const RegisterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  useremail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const RegisterModel = mongoose.model("Register", RegisterSchema);

class Register {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;
    await this.userExists();
    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await RegisterModel.create(this.body);
  }

  async userExists() {
    const user = await RegisterModel.findOne({
      username: this.body.username,
    });

    if (user) {
      this.errors.push("Não foi possível cadastrar este usuário.");
    }
  }

  validate() {
    this.sanitize();

    if (this.body.username.length === 0) {
      this.errors.push("O usuário precisa ser informado.");
    }

    if (this.body.useremail.length <= 1) {
      this.errors.push("O email precisa ser informado.");
    }

    if (this.body.password.length === 0) {
      this.errors.push("A senha precisa ser informada.");
    }
  }

  sanitize() {
    for (const key in this.body) {
      if (typeof this.body[key] === "string") {
        if (key === "useremail") {
          this.body[key] = validator.normalizeEmail(this.body[key].trim());
        } else {
          this.body[key] = validator.escape(
            validator.stripLow(this.body[key].trim())
          );
        }
      } else {
        this.body[key] = "";
      }
    }

    this.body = {
      username: this.body.username,
      useremail: this.body.useremail,
      password: this.body.password,
    };
  }
}

module.exports = { Register, RegisterModel };
