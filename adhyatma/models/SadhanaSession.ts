import mongoose, { Schema, models, model } from "mongoose";

export interface ISadhanaSession {
  userId: string;
  japaRounds: number;
  meditationMinutes: number;
  date: Date;
}

const SadhanaSessionSchema = new Schema<ISadhanaSession>({
  userId: {
    type: String,
    required: true,
  },
  japaRounds: {
    type: Number,
    default: 0,
  },
  meditationMinutes: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Prevents Mongoose from redefining the model on every hot-reload in dev
const SadhanaSession =
  models.SadhanaSession ||
  model<ISadhanaSession>("SadhanaSession", SadhanaSessionSchema);

export default SadhanaSession;
