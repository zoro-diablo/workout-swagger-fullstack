const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const secret = process.env.SECRET;

// Create a JWT
const createToken = (user) => {
  return jwt.sign({ _id: user._id, role: user.role }, secret, {
    expiresIn: '3d',
  });
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user);
    res.status(200).json({ email, role: user.role, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// User signup
const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user);
    res.status(200).json({ email, role: user.role, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// Admin + User signup
// const signupUser = async (req, res) => {
//   const { email, password, role } = req.body; 
//   try {
//     const user = await User.signup(email, password, role || 'user');
//     const token = createToken(user);
//     res.status(200).json({ email, role: user.role, token });
//   } catch (err) {
//     res.status(400).json({ err: err.message });
//   }
// };

// Admin signup (admin-only)
const signupAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password, 'admin');
    const token = createToken(user);
    res.status(200).json({ email, role: user.role, token });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = { loginUser, signupUser, signupAdmin };
