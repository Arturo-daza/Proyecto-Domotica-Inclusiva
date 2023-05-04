// variables de configuracion
let nombreUsuario;
let detectarObjetos;
let manejoPuertas;
let manejoVentanas;
let manejoLuces;




function asignarVariables(interaccionPuertas,interaccionVentanas,interaccionLuces,deteccionObjetos){
    if (interaccionPuertas == '1'){
        manejoPuertas = true 
    }else{
        manejoPuertas = false
    }
    if (interaccionVentanas == '1'){
        manejoVentanas = true 
    }else{
        manejoPuertas = false
    }
    if (interaccionLuces == '1'){
        manejoLuces = true 
    }else{
        manejoPuertas = false
    }
    if (deteccionObjetos == '1'){
        detectarObjetos = true 
    }else{
        deteccionObjetos = false
    }
}