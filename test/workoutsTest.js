const express = require('express');
const WorkOut = requie('./workoutModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.json('Get a single workout');
});

router.post('/:id', async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await WorkOut.create({
      title,
      reps,
      load,
    });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = router;
