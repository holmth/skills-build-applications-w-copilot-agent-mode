import { Router } from 'express';
import Activity from '../models/Activity.js';

const router = Router();

router.get('/', async (_request, response) => {
  const activities = await Activity.find().populate('user');
  response.json(activities);
});

router.get('/:id', async (request, response) => {
  const activity = await Activity.findById(request.params.id).populate('user');
  if (!activity) {
    response.status(404).json({ error: 'Activity not found' });
    return;
  }
  response.json(activity);
});

router.post('/', async (request, response) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json(activity);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

router.put('/:id', async (request, response) => {
  try {
    const activity = await Activity.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!activity) {
      response.status(404).json({ error: 'Activity not found' });
      return;
    }
    response.json(activity);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

router.delete('/:id', async (request, response) => {
  const activity = await Activity.findByIdAndDelete(request.params.id);
  if (!activity) {
    response.status(404).json({ error: 'Activity not found' });
    return;
  }
  response.status(204).send();
});

export default router;
