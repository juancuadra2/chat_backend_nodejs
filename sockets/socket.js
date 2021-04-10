const {io} = require('../index');

io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => { 
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