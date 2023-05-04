from flask import Flask, render_template, request, redirect, url_for
from controllerBD import *
app = Flask(__name__)
application = app


@app.route('/')
def index():
    configuraciones = listaconfiguraciones()
    context = {
        'nombreUsuario': configuraciones[0]['nombreUsuario'],
        'interaccionPuertas': configuraciones[0]['interaccionPuertas'],
        'interaccionVentanas': configuraciones[0]['interaccionVentanas'],
        'interaccionLuces': configuraciones[0]['interaccionLuces'],
        'deteccionObjetos': configuraciones[0]['deteccionObjetos']
    }
    return render_template('index.html', **context)


@app.route('/configuraciones', methods=['GET', 'POST'])
def configuraciones():
    if request.method == 'POST':
        nombreUsuario = request.form['nombreUsuario']
        interaccionPuertas = int(request.form['interaccionPuertas'])
        interaccionVentanas = int(request.form['interaccionVentanas'])
        interaccionLuces = int(request.form['interaccionLuces'])
        deteccionObjetos = int(request.form['deteccionObjetos'])
        actualizarConfiguraciones(interaccionPuertas, interaccionVentanas,
                                  interaccionLuces, deteccionObjetos, nombreUsuario)
        configuraciones = listaconfiguraciones()
        context = {
            'nombreUsuario': configuraciones[0]['nombreUsuario'],
            'interaccionPuertas': configuraciones[0]['interaccionPuertas'],
            'interaccionVentanas': configuraciones[0]['interaccionVentanas'],
            'interaccionLuces': configuraciones[0]['interaccionLuces'],
            'deteccionObjetos': configuraciones[0]['deteccionObjetos']
        }
        return redirect(url_for("index"))
    else:
        configuraciones = listaconfiguraciones()
        context = {
            'configuraciones': configuraciones
        }
        return render_template('configuraciones.html', **context)


if __name__ == "__main__":
    app.run(debug=True, port=8000)
