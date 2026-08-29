import mongoose, { Schema } from 'mongoose';
import type { Document, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: Types.ObjectId[];
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export default mongoose.model<ITeam>('Team', teamSchema);
