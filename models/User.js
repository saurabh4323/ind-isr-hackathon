import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    firstName: String,
    lastName: String,
    age: Number,
    condition: {
      type: String,
      enum: ['hand', 'leg', 'walking', 'general'],
      default: 'general'
    },
    injuryDate: Date,
    recoveryStage: {
      type: String,
      enum: ['early', 'intermediate', 'advanced'],
      default: 'early'
    }
  },
  progress: {
    totalSessions: { type: Number, default: 0 },
    totalTime: { type: Number, default: 0 },
    currentLevel: { type: Number, default: 1 },
    experience: { type: Number, default: 0 },
    achievements: [{ type: String }],
    streak: { type: Number, default: 0 }
  },
  preferences: {
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    gameTypes: [{ type: String }],
    reminderTime: String,
    theme: { type: String, default: 'default' }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  }
});

userSchema.pre('save', function(next) {
  this.lastActive = new Date();
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);
