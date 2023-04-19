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
    };

    reconocimientoDeVoz.onend = function () {
    document.querySelector("button").textContent = "Activar micrófono";
    document.querySelector("button").onclick = function() {activarReconocimientoDeVoz()};
    }

    reconocimientoDeVoz.start();

    document.querySelector("button").textContent = "Desactivar micrófono";
    document.querySelector("button").onclick = function() {desactivarReconocimientoDeVoz()};
}

function desactivarReconocimientoDeVoz() {
    reconocimientoDeVoz.stop();
    document.querySelector("button").textContent = "Activar micrófono";
    document.querySelector("button").onclick = function() {activarReconocimientoDeVoz()};
    clearTimeout(apagarDespuesDe);
}