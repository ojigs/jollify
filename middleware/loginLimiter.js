const rateLimit = require("express-rate-limit");

// Limit each IP to five login attempts  per window per minute
const loginLimiter = rateLimit({
  windowMS: 60 * 1000,
  max: 5,
  message: {
    message:
      "Too many login attempts from this IP. Please ttry again after one minute",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginLimiter };
