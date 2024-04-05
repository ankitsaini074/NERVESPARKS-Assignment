const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  user_email: { type: String, required: true, unique: true },
  user_id: { type: String, required: true, unique: true },
  user_location: { type: String },
  user_info: { type: Schema.Types.Mixed },
  password_hash: { type: String, required: true },
  vehicle_info: [{ type: Schema.Types.ObjectId, ref: 'SoldVehicle' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
