const Doctor = require('../models/doctorModel');

// Función para crear un Doctor
exports.createDoctor = async (req, res) => {
  try {
    const doctorData = req.body;
    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    res.status(201).json({
      success: true,
      data: newDoctor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Función para obtener todos los doctores
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json({
      success: true,
      data: doctors
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Función para agregar una fecha no disponible a un doctor
exports.addUnavailableDate = async (req, res) => {
  try {
    const { doctorId, date } = req.body;

    // Verificar si el doctor existe
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Agregar la fecha no disponible al doctor
    doctor.unavailableDates.push(date);
    await doctor.save();

    res.status(200).json({
      success: true,
      data: doctor.unavailableDates
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


exports.getDoctors = async (req, res, next) => {

    res.send('Get all doctors');

};