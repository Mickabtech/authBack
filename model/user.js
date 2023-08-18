const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//creating a user model
const userSchema = new Schema({
  first_name: { type: String, default: null, required: true, },
  last_name: { type: String, default: null, required: true, },
  email: { type: String, unique: true, required: true, },
  password: { type: String, required: true, },
  field: { type: String, default: null, required: true, },
  profession: { type: String, default: null, required: true, },
  aboutYou: { type: String, default: null, required: true, },
  // image: {type: String, required: true, },      
  token: { type: String },
});


module.exports = mongoose.model("user", userSchema);