const { Log } = require("../utils/log");

// Function to log details of each request
function reqLogger(req, res, next) {
  const stack = "frontend";
  const level = "info";
  const pkg = "api";
  const fullMessage = `Request: ${req.method} ${req.url}`;
  const message = fullMessage.length > 48 ? fullMessage.slice(0, 48) : fullMessage; // Limit to 48 characters

  try {
    // Try to send the log
    Log(stack, level, pkg, message).catch((error) => {
      console.log('Log request failed:', error.message);
    });
  } catch (error) {
    console.log('Log request error:', error.message);
  }

  // Move to the next step
  next();
}

// Function to log errors when something goes wrong
function errLogger(err, req, res, next) {
  const stack = "frontend";
  const level = "error";
  const pkg = "api";
  const fullMessage = `Error occurred: ${err.message}`;
  const message = fullMessage.length > 48 ? fullMessage.slice(0, 48) : fullMessage; // Limit to 48 characters

  try {
    // Try to send the error log
    Log(stack, level, pkg, message).catch((error) => {
      console.log('Error log failed:', error.message);
    });
  } catch (error) {
    console.log('Error log error:', error.message);
  }

  // Pass the error to the next handler
  next(err);
}

module.exports = { reqLogger, errLogger };