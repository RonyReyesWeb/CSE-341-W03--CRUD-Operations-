// Catch requests to routes that don't exist
const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
};

// Catch-all error handler for anything thrown/passed via next(err)
// This is a safety net in addition to the try/catch blocks in each controller.
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong on the server'
  });
};

module.exports = { notFound, errorHandler };
