import mongoose from 'mongoose';

import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      { name: 'Octopus Overlords', members: [] },
      { name: 'Coral Crushers', members: [] },
    ]);

    const users = await User.insertMany([
      { name: 'Ada Lovelace', email: 'ada@octofit.com', age: 29, team: teams[0]._id },
      { name: 'Grace Hopper', email: 'grace@octofit.com', age: 34, team: teams[0]._id },
      { name: 'Alan Turing', email: 'alan@octofit.com', age: 27, team: teams[1]._id },
      { name: 'Katherine Johnson', email: 'katherine@octofit.com', age: 31, team: teams[1]._id },
    ]);

    teams[0].members = [users[0]._id, users[1]._id];
    teams[1].members = [users[2]._id, users[3]._id];
    await Promise.all(teams.map((team) => team.save()));

    const workouts = await Workout.insertMany([
      {
        name: 'Morning Run',
        description: 'A steady-paced 5km run to start the day.',
        category: 'cardio',
        difficulty: 'beginner',
      },
      {
        name: 'Full Body Strength',
        description: 'Compound lifts targeting all major muscle groups.',
        category: 'strength',
        difficulty: 'intermediate',
      },
      {
        name: 'HIIT Sprint Intervals',
        description: 'High-intensity sprint intervals with short recovery.',
        category: 'cardio',
        difficulty: 'advanced',
      },
      {
        name: 'Yoga Flow',
        description: 'A relaxing yoga session focused on flexibility.',
        category: 'flexibility',
        difficulty: 'beginner',
      },
    ]);

    await Activity.insertMany([
      { user: users[0]._id, type: 'Running', durationMinutes: 30, caloriesBurned: 250 },
      { user: users[1]._id, type: 'Cycling', durationMinutes: 45, caloriesBurned: 400 },
      { user: users[2]._id, type: 'Swimming', durationMinutes: 40, caloriesBurned: 350 },
      { user: users[3]._id, type: 'Strength Training', durationMinutes: 50, caloriesBurned: 300 },
      { user: users[0]._id, type: 'Yoga', durationMinutes: 20, caloriesBurned: 100 },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 850 },
      { user: users[1]._id, team: teams[0]._id, points: 720 },
      { user: users[2]._id, team: teams[1]._id, points: 900 },
      { user: users[3]._id, team: teams[1]._id, points: 640 },
    ]);

    console.log(
      `Inserted ${users.length} users, ${teams.length} teams, ${workouts.length} workouts, and their activities/leaderboard entries.`,
    );

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
