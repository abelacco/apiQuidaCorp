const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clienteController');


router.post('/create', clientController.createClient);

module.exports = router;
