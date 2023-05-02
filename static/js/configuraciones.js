// variables de configuracion
let nombreUsuario;
let detectarObjetos;
let manejoPuertas;
let manejoVentanas;
let manjeoLuces;


function configuraciones(){
    nombreUsuario = document.getElementsByName("nombreUsuario")[0].value;
    detectarObjetos=document.getElementsByName("deteccionObjetos")[0].value;
    manejoPuertas=document.getElementsByName("interaccionPuertas")[0].value;
    manejoVentanas=document.getElementsByName("interaccionVentanas")[0].value;
    manjeoLuces=document.getElementsByName("interaccionLuces")[0].value;
    transformarVariable(); 
    convertirTextoAVoz("Hola " + nombreUsuario+ " Tus preferencias quedaron guardadas" )
}

function transformarVariable(){
    if (detectarObjetos == 0){
        detectarObjetos = false
    }else{
        detectarObjetos = true
    }
    if (manejoPuertas == 0){
        manejoPuertas = false
    }else{
        manejoPuertas = true
    }
    if (manejoVentanas == 0){
        manejoVentanas = false
    }else{
        manejoVentanas = true
    }
    if (manjeoLuces == 0){
        manjeoLuces = false
    }else{
        manjeoLuces = true
    }
}