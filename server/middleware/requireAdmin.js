const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;


const requireAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ err: 'No token provided' });

  try {
    const decoded = jwt.verify(token, secret);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ err: 'Admin access required' });
    }
    req.userId = decoded._id;
    next();
  } catch (err) {
    res.status(401).json({ err: 'Invalid token' });
  }
};

module.exports = requireAdmin;
