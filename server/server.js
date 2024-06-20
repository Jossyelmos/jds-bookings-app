const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const {auth} = require('./middleware/authMiddleware');

const port = process.env.PORT || 3001;

// connect to database
connectDB();

// Setup middlewares
app.use(cookieParser());
app.use(express.json());

//  setup routes
app.use('/auth', auth);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));