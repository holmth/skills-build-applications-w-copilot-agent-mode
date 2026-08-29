import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

router.get('/', async (_request, response) => {
  const users = await User.find();
  response.json(users);
});

router.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);
  if (!user) {
    response.status(404).json({ error: 'User not found' });
    return;
  }
  response.json(user);
});

router.post('/', async (request, response) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json(user);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

router.put('/:id', async (request, response) => {
  try {
    const user = await User.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      response.status(404).json({ error: 'User not found' });
      return;
    }
    response.json(user);
  } catch (error) {
    response.status(400).json({ error: (error as Error).message });
  }
});

router.delete('/:id', async (request, response) => {
  const user = await User.findByIdAndDelete(request.params.id);
  if (!user) {
    response.status(404).json({ error: 'User not found' });
    return;
  }
  response.status(204).send();
});

export default router;
