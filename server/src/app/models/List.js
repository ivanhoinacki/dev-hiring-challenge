import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
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
  },
);

export default mongoose.model('List', ListSchema);
