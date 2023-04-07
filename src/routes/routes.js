const doctorRoutes = require('./doctorRoutes');
const citaRoutes = require('./citaRoutes');
const clienteRoutes = require('./clienteRoutes');


module.exports = (app) => {
    app.use('/doctors', doctorRoutes);
    app.use('/client', clienteRoutes);
    app.use('/appointment', citaRoutes);

}

