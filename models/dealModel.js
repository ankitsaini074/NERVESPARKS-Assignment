const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dealSchema = new Schema({
  deal_id: { type: String, required: true, unique: true },
  car_id: { type: String, required: true },
  deal_info: { type: Schema.Types.Mixed },
});

const Deal = mongoose.model('Deal', dealSchema);

module.exports = Deal;
