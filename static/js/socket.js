const socket = io('http://localhost:5000');

socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});

// Enviar datos al servidor
socket.emit('send_message', { data: 'Datos desde el cliente' });

socket.on('send_message', (data) => {
    const message = data.message;
    console.log('Mensaje recibido:', message);
});


// const socket = io('http://localhost:5000');

// socket.on('connect', () => {
//     console.log('Conectado al servidor');
// });

// socket.on('disconnect', () => {
//     console.log('Desconectado del servidor');
// });
// function detectarCambios() {
//     // Enviar datos al servidor
//     socket.emit('my_event', { ubicacionesLuz, ubicacionesPuertas });
// }

// socket.on('my_message', (data) => {
//     const message = data.mensaje;
//     console.log('Mensaje recibido:', message);
// });

// // Escuchar eventos del servidor
// socket.on('my_response', (data) => {
//     console.log('Respuesta del servidor:', data);
//     ubicacionesLuz = data['ubicacionesLuz']
//     ubicacionesPuertas = data['ubicacionesPuertas']
//     console.log(ubicacionesPuertas);
// });