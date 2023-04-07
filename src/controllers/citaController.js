const Appointment = require('../models/citaModel');
const Doctor = require('../models/doctorModel');
const Client = require('../models/clienteModel');
const moment = require('moment');


// Función para crear una Cita
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, clientId, appointmentDate, appointmentTime, duration } = req.body;

    // Verificar si el doctor y el cliente existen
    const doctor = await Doctor.findById(doctorId);
    const client = await Client.findById(clientId);

    if (!doctor || !client) {
      return res.status(404).json({
        success: false,
        message: 'Doctor or client not found'
      });
    }

    // Verifica si el doctor no atiende en la fecha especificada
    const isUnavailable = doctor.unavailableDates.some((unavailableDate) => {
      return moment(unavailableDate).isSame(date, 'day');
    });

    if (isUnavailable) {
      return res.status(404).json({
        success: false,
        message: 'Doctor is not available on this day'
      });
    }

    // Verificar si ya hay una cita en ese horario
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate,
      appointmentTime
    });



    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'There is already an appointment at this time'
      });
    }

    const newAppointment = new Appointment({
      doctor: doctorId,
      client: clientId,
      appointmentDate,
      appointmentTime,
      duration
    });

    await newAppointment.save();

    res.status(201).json({
      success: true,
      data: newAppointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};



// Función para mostrar los horarios disponibles de un doctor en un día específico
exports.getAvailableTimes = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    // Verificar si el doctor existe
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Encuentra el horario del doctor para ese día
    const dayOfWeek = moment(date).format('dddd');
    console.log(dayOfWeek)
    const doctorSchedule = doctor.availableTimes.find(
      (schedule) => schedule.day === dayOfWeek
    );
      console.log(doctorSchedule)
    if (!doctorSchedule) {
      return res.status(404).json({
        success: false,
        message: 'Doctor is not available on this day'
      });
    }

    // Encuentra las citas ya programadas para ese día
    const startDate = moment(date).startOf('day').toDate();
    const endDate = moment(date).endOf('day').toDate();

    const appointments = await Appointment.find({
      doctor: doctorId,
      appointmentDate: { $gte: startDate, $lte: endDate }
    });

    // Genera los horarios disponibles basados en el horario del doctor y las citas existentes
    const startTime = moment(doctorSchedule.startTime, 'HH:mm');
    const endTime = moment(doctorSchedule.endTime, 'HH:mm');
    const interval = doctorSchedule.interval;
    const availableTimes = [];

    while (startTime.isBefore(endTime)) {
      const formattedTime = startTime.format('HH:mm');
      const existingAppointment = appointments.find(
        (appointment) => appointment.appointmentTime === formattedTime
      );

      if (!existingAppointment) {
        availableTimes.push(formattedTime);
      }

      startTime.add(interval, 'minutes');
    }

    res.status(200).json({
      success: true,
      data: availableTimes
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// const Doctor = require('../models/doctor');

// exports.agendarCita = async (req, res, next) => {
//   try {
//     // Buscar el doctor por id
//     const doctor = await Doctor.findById(req.body.doctorId);

//     // Validar que el doctor exista
//     if (!doctor) {
//       return res.status(404).json({ message: 'Doctor no encontrado' });
//     }

//     // Obtener el horario del día para el doctor
//     const horario = doctor.horario.find(h => h.dia === req.body.dia);

//     // Validar que el horario para ese día exista
//     if (!horario) {
//       return res.status(400).json({ message: 'No se encontró horario para ese día' });
//     }

//     // Obtener la hora de inicio y fin del horario
//     const horaInicio = new Date(`${req.body.dia} ${horario.desde}`);
//     const horaFin = new Date(`${req.body.dia} ${horario.hasta}`);

//     // Calcular la cantidad de citas que se pueden hacer en el horario
//     const duracionCita = horario.intervalo;
//     const cantidadCitas = Math.floor((horaFin - horaInicio) / duracionCita / 1000 / 60);

//     // Obtener las citas reservadas para ese horario
//     const citasReservadas = horario.citas;

//     // Validar que haya espacio disponible para la cita
//     if (citasReservadas.length >= cantidadCitas) {
//       return res.status(400).json({ message: 'No hay espacio disponible en el horario seleccionado' });
//     }

//     // Validar que la hora de la cita esté dentro del horario
//     const horaCita = new Date(req.body.fecha);
//     if (horaCita < horaInicio || horaCita >= horaFin) {
//       return res.status(400).json({ message: 'La hora de la cita no está dentro del horario disponible' });
//     }

//     // Validar que la cita no esté reservada
//     const citaReservada = citasReservadas.find(c => new Date(c).getTime() === horaCita.getTime());
//     if (citaReservada) {
//       return res.status(400).json({ message: 'La cita seleccionada ya está reservada' });
//     }

//     // Agregar la cita a la lista de citas reservadas para el horario
//     horario.citas.push(horaCita);

//     // Guardar los cambios en la base de datos
//     await doctor.save();

//     // Enviar respuesta exitosa
//     res.status(201).json({ message: 'Cita reservada exitosamente' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error al agendar cita' });
//   }
// };
