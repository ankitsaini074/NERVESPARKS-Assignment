const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  admin_id: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
