const ApiError = require("./error/ApiError");

// Import contact model
Contact = require("./contactModel");

// Handle index actions
exports.index = function (req, res, next) {
  Contact.get(function (err, contacts) {
    if (err) {
      // res.json({
      //   status: "error",
      //   message: err,
      // });
      next(ApiError.internal(err));
      return;
    }
    res.json({
      status: "success",
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  });
};

// Handle create contact actions
exports.new = function (req, res, next) {
  var contact = new Contact();
  contact.name = req.body.name ? req.body.name : contact.name;
  contact.gender = req.body.gender;
  contact.email = req.body.email;
  contact.phone = req.body.phone;
  // save the contact and check for errors
  contact.save(function (err) {
    if (err) {
      next(ApiError.badRequest(err));
      return;
      //res.json(err);
    }
    res.json({
      message: "New contact created!",
      data: contact,
    });
  });
};

// Handle view contact info
exports.view = function (req, res, next) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err) {
      // res.send(err);
      next(ApiError.notFound(err));
      return;
    }
    res.json({
      message: "Contact details loading..",
      data: contact,
    });
  });
};

// Handle update contact info
exports.update = function (req, res, next) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err) {
      // res.send(err);
      next(ApiError.notFound(err));
      return;
    }
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    // save the contact and check for errors
    contact.save(function (err) {
      if (err) {
        // res.json(err);
        next(ApiError.badRequest(err));
        return;
      }
      res.json({
        message: "Contact Info updated",
        data: contact,
      });
    });
  });
};

// Handle delete contact
exports.delete = function (req, res, next) {
  Contact.remove(
    {
      _id: req.params.contact_id,
    },
    function (err, contact) {
      if (err) {
        // res.send(err);
        next(ApiError.notFound(err));
        return;
      }
      res.json({
        status: "success",
        message: "Contact deleted",
      });
    }
  );
};
