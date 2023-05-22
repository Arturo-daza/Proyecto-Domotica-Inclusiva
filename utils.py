import socketio

# Crea una instancia de cliente de SocketIO como variable global
sio = socketio.Client()
sio.connect('http://127.0.0.1:8000')
def enviar_mensaje(data):
    # Envia un mensaje al servidor
    print(data)
    sio.emit('plano', {'message': data})
# Resto de tu código relacionado con el cliente de SocketIO...
