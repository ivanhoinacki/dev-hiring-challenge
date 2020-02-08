import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual('password').set(function(value) {
  this._password = value;
  this.hashedPassword = bcrypt.hashSync(value, 8);
});

UserSchema.virtual('password').get(function() {
  return this.hashedPassword;
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

export default mongoose.model('User', UserSchema);
