const { setServers } = require("node:dns/promises");
setServers(["1.1.1.1", "8.8.8.8"]);
const express = require('express');
const dotenv = require('dotenv');
const cookieParser=require("cookie-parser");
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();

//Route files
const hotels = require ('./routes/hotels');
const auth = require('./routes/auth');
const bookings = require('./routes/bookings');
const users = require('./routes/users');
const reviews = require('./routes/reviews');
const roomservices = require('./routes/roomservices');

const app = express();

//add cookie parser
app.use(cookieParser());


// CORS - allow configured frontend origin (or localhost for local dev)
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000').split(',');
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin || allowedOrigins[0]);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

//add body parser
app.use(express.json());

//Mount routers
app.use('/api/v1/hotels', hotels);
app.use('/api/v1/auth',auth);
app.use('/api/v1/bookings', bookings);
app.use('/api/v1/users',users);
app.use('/api/v1/reviews', reviews);
app.use('/api/v1/roomservices', roomservices);

//Extend Parser
app.set('query parser', 'extended');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Unhandled Rejection: ${err.message}`);
    // Do NOT call process.exit() on Vercel - it kills the serverless function
});