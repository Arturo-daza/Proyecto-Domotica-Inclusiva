// variables de configuracion
let nombreUsuario;
let detectarObjetos;
let manejoPuertas;
let manejoVentanas;
let manejoLuces;

let habitacion1='';
let habitacion2;
let habitacion3;
let bañoSocial;
let bañoPrivado;
let salaComedor;
let cocina;
let lavado;

function asignarLugares(habitacion1N, habitacion2N, habitacion3N, bañoSocialN, bañoPrivadoN, salaComedorN, cocinaN, lavadoN) {
    habitacion1 = habitacion1N.toLowerCase();
    habitacion2 = habitacion2N.toLowerCase();
    habitacion3 = habitacion3N.toLowerCase();
    bañoSocial = bañoSocialN.toLowerCase();
    bañoPrivado = bañoPrivadoN.toLowerCase();
    salaComedor = salaComedorN.toLowerCase();
    cocina = cocinaN.toLowerCase();
    lavado = lavadoN.toLowerCase();
    ubicacionesPuerta = {
        [habitacion1]: false,
        [habitacion2]: false,
        [habitacion3]: false,
        [bañoSocial]: false,
        [bañoPrivado]: false,
    };
    ubicacionesVentana = {
        [habitacion1]: false,
        [habitacion2]: false,
        [habitacion3]: false,
        [bañoSocial]: false,
        [bañoPrivado]: false,
        [cocina]: false,
        [lavado]: false,
        [salaComedor]: false
    };

    ubicacionesLuz = {
        [habitacion1]: false,
        [habitacion2]: false,
        [habitacion3]: false,
        [bañoSocial]: false,
        [bañoPrivado]: false,
        [cocina]: false,
        [lavado]: false,
        [salaComedor]: false
    }
}



function asignarVariables(interaccionPuertas, interaccionVentanas, interaccionLuces, deteccionObjetos) {
    if (interaccionPuertas == '1') {
        manejoPuertas = true
    } else {
        manejoPuertas = false
    }
    if (interaccionVentanas == '1') {
        manejoVentanas = true
    } else {
        manejoPuertas = false
    }
    if (interaccionLuces == '1') {
        manejoLuces = true
    } else {
        manejoPuertas = false
    }
    if (deteccionObjetos == '1') {
        detectarObjetos = true
    } else {
        deteccionObjetos = false
    }
}


