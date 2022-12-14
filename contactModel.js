// contactModel.js

require("dotenv").config();

var mongoose = require("mongoose");

// Setup schema
var contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: String,
    phone: String,
    create_date: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: process.env.ENV == "TEST" ? "testcontacts" : "contacts" } // collection in mongodb
);

// Export Contact model
var Contact = (module.exports = mongoose.model("contact", contactSchema));
module.exports.get = function (callback, limit) {
  Contact.find(callback).limit(limit);
};
