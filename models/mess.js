const mongoose = require('mongoose');

const { Schema } = mongoose;

const messMenuSchema = new Schema({
  hostel: {
    type: String,
    required: true,
  },
  messMenu: String,
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const MessMenu = mongoose.model('messmenu', messMenuSchema);
module.exports = MessMenu;
