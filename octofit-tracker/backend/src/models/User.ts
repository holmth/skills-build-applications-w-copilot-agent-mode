import mongoose, { Schema } from 'mongoose';
import type { Document, Types } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age?: number;
  team?: Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('User', userSchema);
