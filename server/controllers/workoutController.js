const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// Get all workouts for the authenticated user or all workouts for admin
const getWorkouts = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user_id: req.user._id };
    const workouts = await Workout.find(query).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single workout
const getSingleWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: 'No such id' });
    }
    const query = req.user.role === 'admin' ? { _id: id } : { _id: id, user_id: req.user._id };
    const workout = await Workout.findOne(query);
    if (!workout) {
      return res.status(404).json({ err: 'No such workout or unauthorized' });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new workout
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  if (!title || !load || !reps) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const workout = await Workout.create({
      title,
      load,
      reps,
      user_id: req.user._id,
    });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// Delete a specific workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: 'No such id' });
    }
    const query = req.user.role === 'admin' ? { _id: id } : { _id: id, user_id: req.user._id };
    const workout = await Workout.findOneAndDelete(query);
    if (!workout) {
      return res.status(404).json({ err: 'No such workout or unauthorized' });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

// Update a specific workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: 'No such id' });
    }
    const query = req.user.role === 'admin' ? { _id: id } : { _id: id, user_id: req.user._id };
    const workout = await Workout.findOneAndUpdate(
      query,
      { ...req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!workout) {
      return res.status(404).json({ err: 'No such workout or unauthorized' });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};