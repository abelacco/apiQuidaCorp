const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');


// router.get('/', doctorController.getDoctors);
router.get('/', doctorController.getAllDoctors);
router.post('/create', doctorController.createDoctor);;
router.post('/add-unavailable-date', doctorController.addUnavailableDate);


module.exports = router;
