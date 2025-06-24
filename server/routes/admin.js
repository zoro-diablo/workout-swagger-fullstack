const express = require('express');
const { getUsers, deleteUser } = require('../controllers/adminController');
const requireAdmin = require('../middleware/requireAdmin');

const router = express.Router();

router.use(requireAdmin);

// Get all users
router.get('/users', getUsers);

// Get a single user
router.delete('/users/:id', deleteUser);


module.exports = router;