function getValidationDetails(error) {
  return Object.values(error.errors).map((item) => item.message);
}

function errorHandler(error, req, res, next) {
  let statusCode = error.statusCode || res.statusCode || 500;
  let message = error.message || "Server error";
  let details = [];

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    details = getValidationDetails(error);
  }

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource id";
  }

  res.status(statusCode).json({
    success: false,
    message,
    details
  });
}

module.exports = errorHandler;
