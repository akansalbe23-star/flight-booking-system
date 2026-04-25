// Temporary in-memory data (we'll replace with DB in Phase 3)
let flights = [
  {
    id: 1,
    flightNumber: 'AI-101',
    origin: 'Delhi',
    destination: 'Mumbai',
    departureTime: '2025-06-01T08:00:00',
    arrivalTime: '2025-06-01T10:00:00',
    totalSeats: 180,
    availableSeats: 45,
    price: 4500
  },
  {
    id: 2,
    flightNumber: 'AI-202',
    origin: 'Delhi',
    destination: 'Bangalore',
    departureTime: '2025-06-01T12:00:00',
    arrivalTime: '2025-06-01T14:30:00',
    totalSeats: 160,
    availableSeats: 12,
    price: 5200
  }
];

// GET all flights
const getAllFlights = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: flights.length,
      data: flights
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET flight by ID
const getFlightById = (req, res) => {
  try {
    const flight = flights.find(f => f.id === parseInt(req.params.id));
    if (!flight) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }
    res.status(200).json({ success: true, data: flight });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST create flight
const createFlight = (req, res) => {
  try {
    const newFlight = {
      id: flights.length + 1,
      ...req.body
    };
    flights.push(newFlight);
    res.status(201).json({ success: true, data: newFlight });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT update flight
const updateFlight = (req, res) => {
  try {
    const index = flights.findIndex(f => f.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }
    flights[index] = { ...flights[index], ...req.body };
    res.status(200).json({ success: true, data: flights[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE flight
const deleteFlight = (req, res) => {
  try {
    const index = flights.findIndex(f => f.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }
    flights.splice(index, 1);
    res.status(200).json({ success: true, message: 'Flight deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight
};