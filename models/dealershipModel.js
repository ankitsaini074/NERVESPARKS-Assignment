const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dealershipSchema = new Schema({
  dealership_email: { type: String, required: true, unique: true },
  dealership_id: { type: String, required: true, unique: true },
  dealership_name: { type: String },
  dealership_location: { type: String },
  password_hash: { type: String, required: true },
  dealership_info: { type: Schema.Types.Mixed },
  cars: [{ type: Schema.Types.ObjectId, ref: 'Car' }],
  deals: [{ type: Schema.Types.ObjectId, ref: 'Deal' }],
  sold_vehicles: [{ type: Schema.Types.ObjectId, ref: 'SoldVehicle' }],
});

const Dealership = mongoose.model('Dealership', dealershipSchema);

module.exports = Dealership;
