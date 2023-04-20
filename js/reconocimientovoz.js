let reconocimientoDeVoz;
let apagarDespuesDe;
const TIEMPO_MAXIMO_SILENCIO = 10; // en segundos

function activarReconocimientoDeVoz() {
    reconocimientoDeVoz = new webkitSpeechRecognition();
    reconocimientoDeVoz.lang = "es-ES";
    reconocimientoDeVoz.interimResults = true;
    reconocimientoDeVoz.maxSilence = TIEMPO_MAXIMO_SILENCIO;
    const texto = document.getElementById("mostrar");

    reconocimientoDeVoz.onresult = function (event) {
        const resultado = event.results[0][0].transcript;
        texto.textContent = resultado;
        if (resultado.includes(".")){
            procesarResultado(resultado);
            console.log(resultado);
        }       
    };

    reconocimientoDeVoz.onend = function () {
        document.querySelector("button").textContent = "Activar micrófono";
        document.querySelector("button").onclick = function () { activarReconocimientoDeVoz() };
    }

    reconocimientoDeVoz.start();

    document.querySelector("button").textContent = "Desactivar micrófono";
    document.querySelector("button").onclick = function () { desactivarReconocimientoDeVoz() };
}

function desactivarReconocimientoDeVoz() {
    reconocimientoDeVoz.stop();
    document.querySelector("button").textContent = "Activar micrófono";
    document.querySelector("button").onclick = function () { activarReconocimientoDeVoz() };
    clearTimeout(apagarDespuesDe);
}

function procesarResultado(resultado) {
    // Minuscula  para analizar la cadena de caracteres
    resultado = resultado.toLowerCase();
    const numero = extraerNumero(resultado);
    const texto_resultado = document.getElementById("resulado");
    var respuesta = ""; 

    if (resultado.includes('abrir')) {
        if (resultado.includes('puerta')) {
            if (resultado.includes('habitación')) {
                if (numero) {
                    if (numero > 3) {
                        respuesta = `No existe la habitacion ${numero}.`;
                        texto_resultado.textContent= respuesta;
                    } else {
                        respuesta =`Se va abrir la puerta de la habitacion ${numero}.`;
                        convertirTextoAVoz(respuesta)
                        console.log("1");
                        texto_resultado.textContent= respuesta;
                    }
                } else {
                    resultado = 'No se especifica la habitación'; 
                    texto_resultado.textContent= resultado;
                }
            } else if (resultado.includes('principal')) {
                resultado = 'Abriendo puerta principal';
                texto_resultado.textContent= resultado;
                console.log('principal');
            } else if (resultado.includes('baño')){
                if (resultado.includes('social')){
                    resultado = 'Abriendo puerta baño social';
                    texto_resultado.textContent= resultado;
                } else if (resultado.includes('privado')){
                    resultado = 'Abriendo puerta baño privado';
                    texto_resultado.textContent= resultado;
                }
            }
        } else if (resultado.includes('ventana')) {
            if (resultado.includes('habitación')) {
                if (numero) {
                    if (numero > 3) {
                        respuesta = `No existe la habitacion ${numero}.`;
                        texto_resultado.textContent= respuesta;
                    } else {
                        respuesta =`Se va abrir la ventana de la habitacion ${numero}.`;
                        texto_resultado.textContent= respuesta;
                    }
                } else {
                    resultado = 'No se especifica la habitación'; 
                    texto_resultado.textContent= resultado;
                }
            } else if (resultado.includes('baño')){
                if (resultado.includes('social')){
                    resultado = 'Abriendo ventana del baño social';
                    texto_resultado.textContent= resultado;
                } else if (resultado.includes('privado')){
                    resultado = 'Abriendo ventana del baño privado';
                    texto_resultado.textContent= resultado;
                }
            }
            console.log(`Se va a apagar la luz con el número ${numero}.`);
        } else {
            console.log('No se reconoce la acción a realizar.');
        }
    } else {
        console.log('La resultado de texto no contiene la palabra "luz".');
    }
    if(respuesta == ""){
        texto_resultado.textContent= respuesta;
    }

}

function extraerNumero(resultado) {
    const matches = resultado.match(/\d+/); // Busca uno o más dígitos en la cadena
    var regex = /\b(cuatro|dos)\b/gi;
    if (matches) {
        return matches[0]; // Retorna el primer número encontrado
    // Los numeros 2 y 4 el conocimiento de voz lo escribe en texto
    } else if (resultado.includes('dos')) {
        return 2;
    }else if (resultado.includes('cuatro')){
        return 4; 
    }else{
        return null; // Retorna null si no se encontraron números en la cadena
    }
}
