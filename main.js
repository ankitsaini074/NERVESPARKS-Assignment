require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { errorHandler } = require('./utils/errorHandler');
const { connectToDB } = require('./utils/dbUtils');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const dealershipRoutes = require('./routes/dealershipRoutes'); // Import dealershipRoutes
const { verifyToken } = require('./middleware/authMiddleware');
const User = require('./models/userModel');

const app = express();
const PORT = process.env.PORT || 3000;

const crypto = require('crypto');

const jwtSecret = crypto.randomBytes(32).toString('hex');
console.log('JWT Secret:', jwtSecret);

// Load MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;
console.log('MongoDB URI:', mongoURI);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Set up MongoDB connection
connectToDB();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

app.get('/', (req, res) => {
  res.render('index'); // Assuming you have an index.ejs file in your views folder
});

app.get('/login', (req, res) => {
  // Assuming you have a login.ejs file in the views directory
  res.render('login');
});

app.get('/register', (req, res) => {
  // Assuming you have a login.ejs file in the views directory
  res.render('register');
});

app.post('/register', async (req, res) => {
  try {
    // Extract the user data from the request body
    const { username, email, password } = req.body;

    // Create a new user with the hashed password
    const newUser = await userController.createUser({ username, email, password });

    console.log('User saved:', newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Routes
app.use('/auth', authRoutes);
app.use('/users', verifyToken, userRoutes);
app.use('/dealerships', verifyToken, dealershipRoutes);

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
