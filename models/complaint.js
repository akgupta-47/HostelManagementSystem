const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A complaint should have a author'],
    },
    to: {
      type: String,
      required: [true, 'Every problem should be directed to a person'],
      enum: [
        'student',
        'caretaker',
        'mess-incharge',
        'laundry-incharge',
        'warden',
      ],
    },
    problem: {
      type: String,
      required: [true, 'title to your problem is missing'],
    },
    description: {
      type: String,
      required: [true, 'Every post should have a description'],
    },
    status: {
      type: String,
      required: [true, 'Every complaint is either pending or solved'],
      enum: ['pending', 'solved'],
    },
    hostel: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
