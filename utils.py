import socketio

# Crea una instancia de cliente de SocketIO como variable global
sio = socketio.Client()
sio.connect('http://127.0.0.1:8000')
def enviar_mensaje(ubicacionesLuz, ubicacionesPuerta, ubicacionesVentana, mensaje):
    # Envia un mensaje al servidor
    sio.emit('plano', {'message': {'ubicacionesLuz': ubicacionesLuz, 'ubicacionesPuerta': ubicacionesPuerta, 'ubicacionesVentana': ubicacionesVentana, 'mensaje':mensaje}})
# Resto de tu código relacionado con el cliente de SocketIO...
