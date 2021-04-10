const express = require('express');
const path = require('path');
require('dotenv').config();

//DB CONFIG
require('./db/config').dbConnection();

//App de express
const app = express();

//Lectura y parseo del body
app.use(express.json());

//Mis rutas
app.use('/api/login', require('./routes/auth'));


//Node server socket
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// CARPETA PUBLICA
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath))

server.listen(process.env.PORT, err => !err ? console.log(`Puerto corriendo en puerto ${ process.env.PORT }`) : new Error(err) );