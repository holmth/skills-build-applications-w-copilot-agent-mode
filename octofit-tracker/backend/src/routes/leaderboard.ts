import { Router } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_request, response) => {
  const entries = await Leaderboard.find().sort({ points: -1 }).populate('user').populate('team');
  response.json(entries);
});

router.get('/:id', async (request, response) => {
  const entry = await Leaderboard.findById(request.params.id).populate('user').populate('team');
  if (!entry) {
    response.status(404).json({ error: 'Leaderboard entry not found' });
    return;
  }
  response.json(entry);
});

router.post('/', async (request, response) => {
  try {
    const entry = await Leaderboard.create(request.body);
    response.status(201).json(entry);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

router.put('/:id', async (request, response) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!entry) {
      response.status(404).json({ error: 'Leaderboard entry not found' });
      return;
    }
    response.json(entry);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

router.delete('/:id', async (request, response) => {
  const entry = await Leaderboard.findByIdAndDelete(request.params.id);
  if (!entry) {
    response.status(404).json({ error: 'Leaderboard entry not found' });
    return;
  }
  response.status(204).send();
});

export default router;
