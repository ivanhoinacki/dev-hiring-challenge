import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    Project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    task: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('List', ListSchema);
