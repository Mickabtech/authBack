const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const Joi = require('joi');


//creating a user model
// const userSchema = new Schema({
//   first_name: { type: String, default: null, required: true, },
//   last_name: { type: String, default: null, required: true, },
//   email: { type: String, unique: true, required: true, },
//   password: { type: String, required: true, },
//   field: { type: String, default: null, required: true, },
//   profession: { type: String, default: null, required: true, },
//   aboutYou: { type: String, default: null, required: true, },   
//   token: { type: String }
// });



const userSchema = Joi.object({
    first_name: Joi.string().min(3).max(25).required(),
    last_name: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    field: Joi.string().min(3).max(200).required(),
    profession: Joi.string().min(3).max(200).required(),
    aboutYou: Joi.string().min(20).max(1000).required(),
})


module.exports = mongoose.model("user", userSchema);