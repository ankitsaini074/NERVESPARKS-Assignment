const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
  car_id: { type: String, required: true, unique: true },
  type: { type: String },
  name: { type: String },
  model: { type: String },
  car_info: { type: Schema.Types.Mixed },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
