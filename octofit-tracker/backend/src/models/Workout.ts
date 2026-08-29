import mongoose, { Schema } from 'mongoose';
import type { Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
  },
  { timestamps: true },
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
