const rateLimit = require("express-rate-limit");

// Limit each IP to five login attempts  per window per minute
const loginLimiter = rateLimit({
  windowMS: 60 * 1000, // 60 seconds
  max: 5, // 5 attempts
  message: {
    message:
      "Too many attempts from this IP. Please try again after one minute",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginLimiter };
