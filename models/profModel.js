const mongoose = require('mongoose');
// const User = require('./userModel');

const { Schema } = mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  roomInfo: {
    type: String,
  },
  laundryNumber: {
    type: String,
    unique: true,
  },
  rollNumber: {
    type: Number,
    unique: true,
    minlength: 9,
    maxlength: 9,
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Every profile should contain users Contact info'],
    unique: true,
    minlength: 10,
    maxlength: 10,
  },
  blood: {
    type: String,
    required: [true, "EveryOne's blood group info is necessary"],
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  year: {
    default: String,
    enum: ['1', '2', '3', '4', 'post-graduate', 'phd'],
  },
  seenPosts: [mongoose.Schema.Types.ObjectId],
});

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;
