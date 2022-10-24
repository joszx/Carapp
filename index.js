// FileName: index.js

require("dotenv").config();

// Import express
const express = require("express");

// Import Body parser
const bodyParser = require("body-parser");

// Import Mongoose
const mongoose = require("mongoose");

const apiErrorHandler = require("./error/api-error-handler");

let uri =
  process.env.ENV == "PROD"
    ? process.env.DB_CLOUD_URI
    : process.env.DB_LOCAL_URI;

// Initialize the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
// Deprecated: mongoose.connect('mongodb://localhost/Carapp');
mongoose.connect(uri, { useNewUrlParser: true });

var db = mongoose.connection;

if (!db) {
  console.log("Error connecting to db");
} else {
  console.log("Db connected successfully");
}

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express and Nodemon"));

// Use Api routes in the App
app.use("/api", apiRoutes);

// Error handling
app.use(apiErrorHandler);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running Carapp on port " + port);
});

module.exports = app; // for testing
