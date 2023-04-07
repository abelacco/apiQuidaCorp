const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/citaController');

router.post('/create', appointmentController.createAppointment);
router.get('/available-times', appointmentController.getAvailableTimes);

module.exports = router;
