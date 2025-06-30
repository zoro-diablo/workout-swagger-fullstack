const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const secret = process.env.SECRET;

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ err: 'Authorization token required' });
  }

  if (!authorization.startsWith('Bearer ')) {
    return res.status(401).json({ err: 'Invalid authorization format' });
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, secret);

    const user = await User.findOne({ _id }).select('_id');
    if (!user) {
      return res.status(401).json({ err: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ err: 'Token expired' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ err: 'Invalid token' });
    }
    
    res.status(401).json({ err: 'Request is not authorized' });
  }
};

module.exports = requireAuth;