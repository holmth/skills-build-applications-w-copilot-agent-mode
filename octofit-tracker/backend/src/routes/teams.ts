import { Router } from 'express';
import Team from '../models/Team.js';

const router = Router();

router.get('/', async (_request, response) => {
  const teams = await Team.find().populate('members');
  response.json(teams);
});

router.get('/:id', async (request, response) => {
  const team = await Team.findById(request.params.id).populate('members');
  if (!team) {
    response.status(404).json({ error: 'Team not found' });
    return;
  }
  response.json(team);
});

router.post('/', async (request, response) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json(team);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

router.put('/:id', async (request, response) => {
  try {
    const team = await Team.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!team) {
      response.status(404).json({ error: 'Team not found' });
      return;
    }
    response.json(team);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

router.delete('/:id', async (request, response) => {
  const team = await Team.findByIdAndDelete(request.params.id);
  if (!team) {
    response.status(404).json({ error: 'Team not found' });
    return;
  }
  response.status(204).send();
});

export default router;
