const express = require('express');
const {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

// Check Auth
router.use(requireAuth)

// Get all workouts
router.get('/', getWorkouts);

// Get a single workout
router.get('/:id', getSingleWorkout);

// Create a new workout
router.post('/', createWorkout);

// Delete a specific new workout
router.delete('/:id', deleteWorkout);

// Update a specific new workout
router.patch('/:id', updateWorkout);

module.exports = router;
