import { Router } from 'express';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/', async (_request, response) => {
  const workouts = await Workout.find();
  response.json(workouts);
});

router.get('/:id', async (request, response) => {
  const workout = await Workout.findById(request.params.id);
  if (!workout) {
    response.status(404).json({ error: 'Workout not found' });
    return;
  }
  response.json(workout);
});

router.post('/', async (request, response) => {
  try {
    const workout = await Workout.create(request.body);
    response.status(201).json(workout);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

router.put('/:id', async (request, response) => {
  try {
    const workout = await Workout.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!workout) {
      response.status(404).json({ error: 'Workout not found' });
      return;
    }
    response.json(workout);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

router.delete('/:id', async (request, response) => {
  const workout = await Workout.findByIdAndDelete(request.params.id);
  if (!workout) {
    response.status(404).json({ error: 'Workout not found' });
    return;
  }
  response.status(204).send();
});

export default router;
