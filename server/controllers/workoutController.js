const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//Get all workout
const getWorkouts = async (req, res) => {
  try {
    const workout = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Get a single workout
const getSingleWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: 'No such id' });
    }
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ err: 'No such workout' });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//Create a workout
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
    });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//Delete a workout
const deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: 'No such id' });
    }
    const workout = await Workout.findByIdAndDelete({ _id: id });
    if (!workout) {
      return res.status(404).json({ err: 'No such workout' });
    }
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//Update workout
const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ err: 'No such id' });
    }
    const workout = await Workout.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!workout) {
      return res.status(404).json({ err: 'No such workout' });
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
