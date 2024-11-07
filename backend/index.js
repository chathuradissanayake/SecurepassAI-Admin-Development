const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Configure CORS to allow requests from Frontend
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }));

// Routes
app.use('/users', require('./routes/userRoutes'));

// database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('DB connection successful'))
.catch((error) => console.log('DB connection failed', error))

const port =process.env.PORT;
app.listen(port, () =>{console.log(`Server is running on port ${port}`)});