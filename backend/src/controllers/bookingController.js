let bookings = [];

// GET all bookings
const getAllBookings = (req, res) => {
  try {
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET booking by ID
const getBookingById = (req, res) => {
  try {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST create booking
const createBooking = (req, res) => {
  try {
    const { passengerName, passengerEmail, flightId, seats } = req.body;

    // Basic validation
    if (!passengerName || !passengerEmail || !flightId || !seats) {
      return res.status(400).json({
        success: false,
        message: 'Please provide passengerName, passengerEmail, flightId and seats'
      });
    }

    const newBooking = {
      id: bookings.length + 1,
      passengerName,
      passengerEmail,
      flightId,
      seats,
      status: 'confirmed',
      bookingDate: new Date().toISOString()
    };

    bookings.push(newBooking);
    res.status(201).json({ success: true, data: newBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update booking
const updateBooking = (req, res) => {
  try {
    const index = bookings.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    bookings[index] = { ...bookings[index], ...req.body };
    res.status(200).json({ success: true, data: bookings[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE cancel booking
const cancelBooking = (req, res) => {
  try {
    const index = bookings.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    bookings[index].status = 'cancelled';
    res.status(200).json({ success: true, message: 'Booking cancelled', data: bookings[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllBookings,
  getBookingById,
  createBooking,
  updateBooking,
  cancelBooking
};