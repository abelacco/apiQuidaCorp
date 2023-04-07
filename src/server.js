const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('./app');

// Conectar a la base de datos
mongoose.connect(config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB establecida');

// Iniciar servidor
app.listen(config.port, () => {
    console.log(`Servidor iniciado en http://localhost:${config.port}`);
});
})
.catch(err => console.error('Error al conectar a MongoDB:', err.message));
