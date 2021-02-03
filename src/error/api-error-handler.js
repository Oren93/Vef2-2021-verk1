const ApiError = require("./APIerror");

function apiErrorHandler(err, req, res) {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }

  res.status(500).json("something went wrong");
}

module.exports = apiErrorHandler;
