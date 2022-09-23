const ApiError = require("./ApiError");

// express middleware for handling api error
function apiErrorHandler(err, req, res, next) {
  // dont use console.err or console.log in production because it is not async
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json("Something went wrong");
}

module.exports = apiErrorHandler;
