from flask import Flask, render_template, Response, redirect, url_for
from parpadeo import controlador_parpadeo as cp
app = Flask(__name__)

capturando_video = False

def toggle_captura_video():
    global capturando_video
    if capturando_video:
        # Detener la captura de video
        capturando_video = False
    else:
        # Iniciar la captura de video
        capturando_video = True

@app.route('/')
def index():
    return render_template('index.html', capturando_video=capturando_video)

@app.route('/video_feed')
def video_feed():
    return Response(cp(capturando_video),
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

if __name__ == '__main__':
    app.run(port= 8080, debug=True)
