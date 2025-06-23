const rateLimit = require('express-rate-limit');

// Global rate limiter 
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});

// Login route-specific limiter
const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 5,
  message: 'Too many login attempts, try again in 5 minutes.',
});

module.exports = {
  globalLimiter,
  loginLimiter,
};
