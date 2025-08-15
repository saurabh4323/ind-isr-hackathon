import mongoose from 'mongoose';

const gameSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  gameType: {
    type: String,
    required: true,
    enum: ['hand-coordination', 'leg-strength', 'balance', 'memory', 'reaction']
  },
  sessionData: {
    duration: { type: Number, required: true }, // in seconds
    score: { type: Number, required: true },
    accuracy: { type: Number, required: true }, // percentage
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    movements: [{
      type: { type: String },
      timestamp: Date,
      success: Boolean,
      responseTime: Number
    }]
  },
  performance: {
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    breaks: [{ type: Date }],
    energyLevel: { type: Number, min: 1, max: 10 },
    painLevel: { type: Number, min: 1, max: 10 }
  },
  feedback: {
    enjoyment: { type: Number, min: 1, max: 5 },
    difficulty: { type: Number, min: 1, max: 5 },
    comments: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

gameSessionSchema.index({ userId: 1, createdAt: -1 });
gameSessionSchema.index({ gameType: 1, createdAt: -1 });

export default mongoose.models.GameSession || mongoose.model('GameSession', gameSessionSchema);
