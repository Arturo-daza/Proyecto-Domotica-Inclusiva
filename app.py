from flask import Flask, render_template, request, redirect, url_for
from controllerBD import *
app = Flask(__name__)
application = app


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
    }
    return render_template('index.html', **context)


@app.route('/configuraciones', methods=['GET', 'POST'])
def configuraciones():
    # configuraciones = listaconfiguraciones()
    # context = {
    #     'nombreUsuario': configuraciones[0]['nombreUsuario'],
    #     'interaccionPuertas': configuraciones[0]['interaccionPuertas'],
    #     'interaccionVentanas': configuraciones[0]['interaccionVentanas'],
    #     'interaccionLuces': configuraciones[0]['interaccionLuces'],
    #     'deteccionObjetos': configuraciones[0]['deteccionObjetos']
    # }

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
        # deteccionObjetos = int(request.form['check'])
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
    app.run(debug=True, port=8000)
