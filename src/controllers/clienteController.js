const Client = require('../models/clienteModel');

// Función para crear un Cliente
exports.createClient = async (req, res) => {
  try {
    const clientData = req.body;
    const newClient = new Client(clientData);
    await newClient.save();

    res.status(201).json({
      success: true,
      data: newClient
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
