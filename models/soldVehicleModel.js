const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const soldVehicleSchema = new Schema({
  vehicle_id: { type: String, required: true, unique: true },
  car_id: { type: String, required: true },
  vehicle_info: { type: Schema.Types.Mixed },
});

const SoldVehicle = mongoose.model('SoldVehicle', soldVehicleSchema);

module.exports = SoldVehicle;
