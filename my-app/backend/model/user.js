const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, required: true, minlength: 7 },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
