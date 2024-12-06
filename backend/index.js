const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Configure CORS to allow requests from Frontend
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/doors', require('./routes/doorRoutes'));
app.use('/api/permission-requests', require('./routes/permissionRequestRoutes'));
app.use('/api/contactus', require('./routes/messageRoutes'));
app.use('/api/collections', require('./routes/collectionRoutes'));

// database connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('DB connection successful'))
.catch((error) => console.log('DB connection failed', error))

const port =process.env.PORT;
app.listen(port, () =>{console.log(`Server is running on port ${port}`)});


