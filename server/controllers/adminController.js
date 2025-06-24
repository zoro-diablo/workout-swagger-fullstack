const mongoose = require('mongoose');
const User = require('../models/userModel');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('email role');
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: 'No such id' });
    }
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ err: 'No such user' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = { getUsers, deleteUser };