import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  metrics: {
    handCoordination: {
      accuracy: Number,
      speed: Number,
      endurance: Number
    },
    legStrength: {
      power: Number,
      balance: Number,
      stability: Number
    },
    walking: {
      distance: Number,
      speed: Number,
      balance: Number
    },
    overall: {
      energy: Number,
      mood: Number,
      pain: Number
    }
  },
  goals: {
    daily: { type: Number, default: 0 },
    weekly: { type: Number, default: 0 },
    monthly: { type: Number, default: 0 }
  },
  achievements: [{
    type: String,
    earnedAt: { type: Date, default: Date.now }
  }],
  notes: String
});

progressSchema.index({ userId: 1, date: -1 });

export default mongoose.models.Progress || mongoose.model('Progress', progressSchema);
