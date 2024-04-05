const { UserModel } = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
    // Extract the user data from the request body
    const { username, email, password } = req.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password and a random user_id
    const newUser = new UserModel({
      user_id: uuidv4(), // Generate a random user_id using uuid package
      user_email: email,
      username: username,
      password_hash: hashedPassword,
      vehicles: [],
      deals: []
    });

    // Save the new user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.user; // Assuming user ID is available in the request
    const userProfile = await UserModel.findById(id);
    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(userProfile);
  } catch (err) {
    console.error('Error getting user profile:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.user; // Assuming user ID is available in the request
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(400).json({ error: 'Bad Request', message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error getting user by ID:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error getting all users:', err);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
};