const mongoose = require('mongoose');

const laundrySchema = new mongoose.Schema({
  usr: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  lNum: {
    type: String,
    required: true,
  },
  sPhon: {
    type: Number,
    required: true,
  },
  entry: {
    type: Date,
    default: Date.now,
    required: [true, 'Every receipt should have an entry date'],
  },
  due: {
    type: Date,
    //required: [true, 'Every receipt should have a due date'],
  },
  amount: {
    type: Number,
    default: 0,
    required: [true, 'Every receipt should have a clothes amount'],
  },
  lStatus: {
    type: Boolean,
    default: false,
  },
  sStatus: {
    type: Boolean,
    default: false,
  },
  clothes: [
    {
      clothType: String,
      amount: {
        type: Number,
        default: 0,
      },
      isTorn: Boolean,
    },
  ],
});

const Laundry = mongoose.model('Laundry', laundrySchema);

module.exports = Laundry;
