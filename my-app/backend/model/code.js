const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const muv = require("mongoose-unique-validator");

const codeSchema = new Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
});
codeSchema.plugin(muv);

module.exports = mongoose.model("Code", codeSchema);
