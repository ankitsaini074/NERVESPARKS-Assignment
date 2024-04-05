// controllers/dealershipController.js
const { ObjectID } = require('mongodb');
const { getDBInstance } = require('../utils/dbUtils');

const db = getDBInstance();

// Create a new dealership
exports.createDealership = async (req, res) => {
  const { name, location, password, dealership_info } = req.body;
  try {
    const dealership = await db.collection('dealerships').insertOne({
      name,
      location,
      password, // Remember to hash the password before saving in production
      dealership_info,
      cars: [],
      deals: [],
      sold_vehicles: [],
    });
    res.status(201).json(dealership.ops[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all dealerships
exports.getAllDealerships = async (req, res) => {
  try {
    const dealerships = await db.collection('dealerships').find().toArray();
    res.status(200).json(dealerships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get dealership by ID
exports.getDealershipById = async (req, res) => {
  const { id } = req.params;
  try {
    const dealership = await db.collection('dealerships').findOne({ _id: ObjectID(id) });
    if (!dealership) {
      return res.status(404).json({ message: 'Dealership not found' });
    }
    res.status(200).json(dealership);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update dealership by ID
exports.updateDealershipById = async (req, res) => {
  const { id } = req.params;
  const { name, location, password, dealership_info } = req.body;
  try {
    const updatedDealership = await db.collection('dealerships').findOneAndUpdate(
      { _id: ObjectID(id) },
      { $set: { name, location, password, dealership_info } },
      { returnOriginal: false }
    );
    if (!updatedDealership.value) {
      return res.status(404).json({ message: 'Dealership not found' });
    }
    res.status(200).json(updatedDealership.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete dealership by ID
exports.deleteDealershipById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDealership = await db.collection('dealerships').findOneAndDelete({ _id: ObjectID(id) });
    if (!deletedDealership.value) {
      return res.status(404).json({ message: 'Dealership not found' });
    }
    res.status(200).json({ message: 'Dealership deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add car to dealership
exports.addCarToDealership = async (req, res) => {
  const { id } = req.params;
  const { make, model, year, car_info } = req.body;
  try {
    const updatedDealership = await db.collection('dealerships').findOneAndUpdate(
      { _id: ObjectID(id) },
      { $push: { cars: { make, model, year, car_info } } },
      { returnOriginal: false }
    );
    if (!updatedDealership.value) {
      return res.status(404).json({ message: 'Dealership not found' });
    }
    res.status(200).json(updatedDealership.value);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = exports;
