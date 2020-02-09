import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    dateComplete: {
      type: Date,
    },
    dateCompletion: {
      type: Date,
    },
    done: {
      type: Boolean,
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List',
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Task', TaskSchema);
