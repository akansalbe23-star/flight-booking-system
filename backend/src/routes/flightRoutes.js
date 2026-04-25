const express = require('express');
const router = express.Router();
const flightController = require('../controllers/flightController');

// GET all flights
router.get('/', flightController.getAllFlights);

// GET single flight by ID
router.get('/:id', flightController.getFlightById);

// POST create a new flight
router.post('/', flightController.createFlight);

// PUT update a flight
router.put('/:id', flightController.updateFlight);

// DELETE remove a flight
router.delete('/:id', flightController.deleteFlight);

module.exports = router;