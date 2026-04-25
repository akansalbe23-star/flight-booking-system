const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

// ─── Middleware ───────────────────────────────────────
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Routes ──────────────────────────────────────────
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

// ─── Health check ─────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Flight Booking API is running ✈️' });
});

// ─── 404 handler ──────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Start server ─────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});