// variables de configuracion
let nombreUsuario;
let detectarObjetos;
let manejoPuertas;
let manejoVentanas;
let manejoLuces;


function configuraciones(){
    nombreUsuario = document.getElementsByName("nombreUsuario")[0].value;
    detectarObjetos=document.getElementsByName("deteccionObjetos")[0].value;
    manejoPuertas=document.getElementsByName("interaccionPuertas")[0].value;
    manejoVentanas=document.getElementsByName("interaccionVentanas")[0].value;
    manejoLuces=document.getElementsByName("interaccionLuces")[0].value;
    convertirTextoAVoz("Hola " + nombreUsuario+ " Tus preferencias quedaron guardadas" )
}

function asignarVariables(interaccionPuertas,interaccionVentanas,interaccionLuces,deteccionObjetos){
    if (interaccionPuertas == 1){
        manejoPuertas = true 
    }
    if (interaccionVentanas == 1){
        manejoVentanas = true 
    }
    if (interaccionLuces == 1){
        manejoLuces = true 
    }
    if (deteccionObjetos == 1){
        detectarObjetos = true 
    }
}