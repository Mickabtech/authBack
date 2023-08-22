const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');



//creating a user model
const userSchema = new Schema({
  first_name: { type: String, default: null, required: true, },
  last_name: { type: String, default: null, required: true, },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address'
    }
  },
  password: { type: String, required: true, },
  field: { type: String, default: null, required: true, },
  profession: { type: String, default: null, required: true, },
  aboutYou: { type: String, default: null, required: true, },   
  token: { type: String }
});






module.exports = mongoose.model("user", userSchema);