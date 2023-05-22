from flask import Flask, render_template, request, redirect, url_for, Response
from parpadeo import controlador_parpadeo as cp
from controllerBD import *
import threading
import socketio
app = Flask(__name__)
application = app
app.config['SECRET_KEY'] = 'secret_key'


# Crea una instancia de cliente de SocketIO como variable global
sio = socketio.Client()

ubicacionesLuz = {}
ubicacionesPuerta = {}
ubicacionesVentana ={}

def conectar_socket():
    # Define los eventos que deseas manejar
    @sio.on('connect')
    def on_connect():
        print('Conectado al servidor SocketIO')

    @sio.on('send_message')
    def on_message(data):
        global ubicacionesLuz, ubicacionesPuerta, ubicacionesVentana
        ubicacionesLuz = data['ubicacionesLuz']
        ubicacionesVentana = data['ubicacionesVentana']
        ubicacionesPuerta = data['ubicacionesPuerta']
        print('Mensaje recibido:', data)
        
    @sio.on('plano')
    def on_message(data):
        print('Mensaje recibido:', data)

    # Establece la conexión al servidor SocketIO
    sio.connect('http://127.0.0.1:8000')

    # Mantén la conexión activa
    sio.wait()
    

    
    

capturando_video = False

def toggle_captura_video():
    global capturando_video
    if capturando_video:
        # Detener la captura de video
        capturando_video = False
    else:
        # Iniciar la captura de video
        capturando_video = True

@app.route('/prueba')
def prueba():
    return render_template('prueba.html', capturando_video=capturando_video)

@app.route('/video_feed')
def video_feed():
    return Response(cp(capturando_video, ubicacionesPuerta, ubicacionesVentana, ubicacionesLuz),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/iniciar_captura')
def iniciar_captura():
    toggle_captura_video()
    # Lógica para iniciar la captura de video
    return redirect(url_for('index'))

@app.route('/detener_captura')
def detener_captura():
    toggle_captura_video()
    # Lógica para detener la captura de video
    return redirect(url_for('index'))
    
@app.route('/')
def index():
    configuraciones = listaconfiguraciones()
    lugaresPlano = listaLugares()
    context = {
        'nombreUsuario': configuraciones[0]['nombreUsuario'],
        'interaccionPuertas': configuraciones[0]['interaccionPuertas'],
        'interaccionVentanas': configuraciones[0]['interaccionVentanas'],
        'interaccionLuces': configuraciones[0]['interaccionLuces'],
        'deteccionObjetos': configuraciones[0]['deteccionObjetos'],

        'habitacion1': lugaresPlano[0]['habitacion1'],
        'habitacion2': lugaresPlano[0]['habitacion2'],
        'habitacion3': lugaresPlano[0]['habitacion3'],
        'bañoPrivado': lugaresPlano[0]['bañoPrivado'],
        'bañoSocial': lugaresPlano[0]['bañoSocial'],
        'salaComedor': lugaresPlano[0]['salaComedor'],
        'lavado': lugaresPlano[0]['lavado'],
        'cocina': lugaresPlano[0]['cocina'],
        'capturando_video':capturando_video
    }
    return render_template('index.html', **context)


@app.route('/configuraciones', methods=['GET', 'POST'])
def configuraciones():
    configuraciones = listaconfiguraciones()
    context = {
        'configuraciones': configuraciones
    }
    return render_template('configuraciones.html', **context)


@app.route('/configuracionesUpdate', methods=['POST'])
def configuracionesUpdate():
    if request.method == 'POST':
        nombreUsuario = request.form['nombreUsuario']
        interaccionPuertas = int(request.form['interaccionPuertas'])
        interaccionVentanas = int(request.form['interaccionVentanas'])
        interaccionLuces = int(request.form['interaccionLuces'])
        deteccionObjetos = int(request.form['deteccionObjetos'])
        actualizarConfiguraciones(interaccionPuertas, interaccionVentanas,
                                  interaccionLuces, deteccionObjetos, nombreUsuario)

        return redirect(url_for("index"))


@app.route('/lugares', methods=['GET', 'POST'])
def lugares():
    lugaresPlano = listaLugares()
    print(lugaresPlano)
    context = {
        'habitacion1': lugaresPlano[0]['habitacion1'],
        'habitacion2': lugaresPlano[0]['habitacion2'],
        'habitacion3': lugaresPlano[0]['habitacion3'],
        'bañoPrivado': lugaresPlano[0]['bañoPrivado'],
        'bañoSocial': lugaresPlano[0]['bañoSocial'],
        'salaComedor': lugaresPlano[0]['salaComedor'],
        'lavado': lugaresPlano[0]['lavado'],
        'cocina': lugaresPlano[0]['cocina'],
    }

    if request.method == 'POST':
        habitacion1 = request.form['habitacion1']
        habitacion2 = request.form['habitacion2']
        habitacion3 = request.form['habitacion3']
        bañoPrivado = request.form['bañoPrivado']
        bañoSocial = request.form['bañoSocial']
        salaComedor = request.form['salaComedor']
        lavado = request.form['lavado']
        cocina = request.form['cocina']
        actualizarLugares(habitacion1, habitacion2, habitacion3,
                          bañoPrivado, bañoSocial, salaComedor, lavado, cocina)
        return redirect(url_for("index"))
    else:
        return render_template('lugares.html', **context)


if __name__ == "__main__":
    # Inicia la conexión del socket en un hilo separado
    socket_thread = threading.Thread(target=conectar_socket)
    socket_thread.start()

    # Ejecuta la aplicación Flask en el hilo principal
    app.run(debug=True, port=5000)