const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.URL_DB, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos, comuniquese con el administrador del sistema');
    }
}

module.exports = {
    dbConnection
}
