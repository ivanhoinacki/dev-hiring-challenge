import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
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

export default mongoose.model('Task', CardSchema);
