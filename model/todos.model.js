const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Todos = schema({
  todo: { type: String },
  status: { type: String },
});

module.exports = mongoose.model("todos", Todos);
