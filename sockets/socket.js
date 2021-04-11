const { estadoUsuario, guardarMensaje } = require('../controllers/socket');
const { comprabarJWT } = require('../helpers/jwt');
const {io} = require('../index');

io.on('connection', client => {
    //Cliente conectado
    console.log('Cliente conectado');

    //Validar token de cliente
    const [ valido, uid ] = comprabarJWT(client.handshake.headers['x-token']);
    if (!valido) return client.disconnect();

    //Cliente autenticado
    estadoUsuario(uid, true);

    //unir a sala
    client.join(uid);

    client.on('mensaje-personal', async (data) =>{
        console.log(data);
        await guardarMensaje(data);
        io.to(data.to).emit('mensaje-personal', data);
    });



    //Cliente desconectado
    client.on('disconnect', () => { 
        estadoUsuario(uid, false);
        console.log('Cliente desconectado')
    });

    // client.emit('active-bands', bands.getBands());
    // client.on('vote-band', data => {
    //     bands.voteBand(data.id);
    //     io.emit('active-bands', bands.getBands());
    // });

    // client.on('add-band', data => {
    //     bands.addBand(new Band(data.name));
    //     io.emit('active-bands', bands.getBands());
    // });

    // client.on('delete-band', data => {
    //     bands.deleteBand(data.id);
    //     io.emit('active-bands', bands.getBands());
    // });

   

    // client.on('mensaje', ( payload ) => {
    //     io.emit('mensaje', {
    //         mensaje: 'Hola a todos',
    //     });
    // });

    // client.on('emitir-mensaje', (data) => {
    //     // Envia el mensaje a todos los clientes
    //     io.emit('nuevo-mensaje', data);
    //     // Envia mensaje a todos menos al que lo emitió
    //     // client.boadcast.emit();
    // });

    
});