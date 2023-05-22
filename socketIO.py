from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from funcionArduino import *
app = Flask(__name__)
application = app
app.config['SECRET_KEY'] = 'secret_key'
socketio = SocketIO(app, cors_allowed_origins='*')


@socketio.on('connect')
def connect():
    print('Cliente conectado')


@socketio.on('disconnect')
def disconnect():
    print('Cliente desconectado')


@socketio.on('send_message')
def send_message(data):
    ubicacionesLuz = data['ubicacionesLuz']
    ubicacionesVentana = data['ubicacionesVentana']
    ubicacionesPuerta = data['ubicacionesPuerta']
    enviarArduino(ubicaionesPuerta=ubicacionesPuerta, ubicacionesVentana=ubicacionesVentana, ubicacionesLuz=ubicacionesLuz)
    emit('send_message', {'message': "Recibido"}, broadcast=True)

@socketio.on('plano')
def send_message(data):
    print(data)
    emit('plano', {'message': data['message']}, broadcast=True)



if __name__ == "__main__":
    socketio.run(app, debug=True, host='0.0.0.0', port=8000)
