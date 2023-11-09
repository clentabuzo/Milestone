// Import necessary modules
const express = require('express');
const pool = require('./config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookie = require('cookie');
const dotenv = require('dotenv');
const userRouter = require('./routes/userAuth');
dotenv.config();

// Setting up your port
const PORT = process.env.PORT || 8000;

// Assigning the variable app to express
const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

const allowedOrigins = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Include cookies and other credentials in CORS requests
};

app.use(cors(corsOptions));

app.use('/api/user', userRouter); // Mount the userRouter on '/api/user'

// Define routes and middleware for userRouter here


// For example, userRouter.get('/', ...) or userRouter.post('/', ...)

// server listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
