let reconocimientoDeVoz;
const tiempoMaximoSilencio = 10;
let ubicacionesPuerta = {};
let ubicacionesVentana = {};
let ubicacionesLuz = {};

function activarReconocimientoDeVoz() {
    const reconocimientoDeVoz = new webkitSpeechRecognition();
    reconocimientoDeVoz.lang = "es-ES";
    reconocimientoDeVoz.interimResults = true;
    reconocimientoDeVoz.maxSilence = tiempoMaximoSilencio;
    const texto = document.getElementById("mostrar");
    texto.textContent = resultado;
    let ultimaLinea = "";

    reconocimientoDeVoz.onresult = function (event) {
        const resultados = event.results;
        for (let i = event.resultIndex; i < resultados.length; i++) {
            const resultado = resultados[i][0].transcript;
            
            ultimaLinea = resultado;
        }
    };

    reconocimientoDeVoz.onend = function () {
        document.querySelector("button").textContent = "Activar micrófono";
        reconocimientoDeVoz.stop();
        // document.querySelector("button").onclick = function () { desactivarReconocimientoDeVoz() };
        if (ultimaLinea != "") {
            procesarResultado(ultimaLinea);
            cambiarPlano();

        }
    }

    reconocimientoDeVoz.start();

    document.querySelector("button").textContent = "Escuchando ando ...";
}
// function desactivarReconocimientoDeVoz() {
//     reconocimientoDeVoz.stop();
//     document.querySelector("button").textContent = "Activar micrófono";
//     document.querySelector("button").onclick = function () { activarReconocimientoDeVoz() };
// }


function procesarResultado(resultado) {
    resultado = resultado.toLowerCase();
    const numero = extraerNumero(resultado);
    const texto_resultado = document.getElementById("resulado");
    var respuesta = "No se reconoce el comando";
    // Codigo abrir puerta
    if (resultado.includes('abrir')) {
        if (resultado.includes('puerta') && manejoPuertas) {
            if (resultado.includes(habitacion1)) {
                if (ubicacionesPuerta[habitacion1] === false) {
                    ubicacionesPuerta[habitacion1] = true;
                    respuesta = `Abriendo puerta ${habitacion1}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La puerta del ${habitacion1} ya está abierta.`
                }
            } else if (resultado.includes(habitacion2)) {
                if (ubicacionesPuerta[habitacion2] === false) {
                    ubicacionesPuerta[habitacion2] = true;
                    respuesta = `Abriendo puerta ${habitacion2}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La puerta del ${habitacion2} ya está abierta.`
                }

            } else if (resultado.includes(habitacion3)) {
                if (ubicacionesPuerta[habitacion3] === false) {
                    ubicacionesPuerta[habitacion3] = true;
                    respuesta = `Abriendo puerta ${habitacion3}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La puerta del ${habitacion3} ya está abierta.`
                }
            }

            else if (resultado.includes(bañoSocial)) {
                if (ubicacionesPuerta[bañoSocial] === false) {
                    ubicacionesPuerta[bañoSocial] = true;
                    respuesta = `Abriendo puerta ${bañoSocial}.`
                } else {
                    respuesta = `La puerta del ${bañoSocial} ya está abierta.`
                }
            }
            else if (resultado.includes(bañoPrivado)) {
                if (ubicacionesPuerta[bañoPrivado] === false) {
                    ubicacionesPuerta[bañoPrivado] = true;
                    respuesta = `Abriendo puerta ${bañoPrivado}.`
                } else {
                    respuesta = `La puerta del ${bañoPrivado} ya está abierta.`
                }

                texto_resultado.textContent = respuesta;
                convertirTextoAVoz(respuesta);
            }
        } else if (resultado.includes('puerta') && !manejoPuertas) {
            respuesta = 'Estan desactivadas las puertas';
            texto_resultado.textContent = respuesta;
            convertirTextoAVoz(respuesta);


        } else if (resultado.includes('ventana') && manejoVentanas) {
            if (resultado.includes(habitacion1)) {
                if (ubicacionesVentana[habitacion1] === false) {
                    ubicacionesVentana[habitacion1] = true;
                    respuesta = `Abriendo ventana ${habitacion1}.`

                } else {
                    respuesta = `La ventana del ${habitacion1} ya está abierta.`
                }
            } else if (resultado.includes(habitacion2)) {
                if (ubicacionesVentana[habitacion2] === false) {
                    ubicacionesVentana[habitacion2] = true;
                    respuesta = `Abriendo ventana ${habitacion2}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La ventana del ${habitacion2} ya está abierta.`
                }

            } else if (resultado.includes(habitacion3)) {
                if (ubicacionesVentana[habitacion3] === false) {
                    ubicacionesVentana[habitacion3] = true;
                    respuesta = `Abriendo ventana ${habitacion3}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La ventana del ${habitacion3} ya está abierta.`
                }
            }

            else if (resultado.includes(bañoSocial)) {
                if (ubicacionesVentana[bañoSocial] === false) {
                    ubicacionesVentana[bañoSocial] = true;
                    respuesta = `Abriendo ventana ${bañoSocial}.`
                } else {
                    respuesta = `La ventana del ${bañoSocial} ya está abierta.`
                }
            }
            else if (resultado.includes(bañoPrivado)) {
                if (ubicacionesVentana[bañoPrivado] === false) {
                    ubicacionesVentana[bañoPrivado] = true;
                    respuesta = `Abriendo ventana ${bañoPrivado}.`
                } else {
                    respuesta = `La ventana del ${bañoPrivado} ya está abierta.`
                }
            } else if (resultado.includes(cocina)) {
                if (ubicacionesVentana[cocina] === false) {
                    ubicacionesVentana[cocina] = true;
                    respuesta = `Abriendo ventana ${cocina}.`
                } else {
                    respuesta = `La ventana del ${cocina} ya está abierta.`
                }
            } else if (resultado.includes(lavado)) {
                if (ubicacionesVentana[lavado] === false) {
                    ubicacionesVentana[lavado] = true;
                    respuesta = `Abriendo ventana ${lavado}.`
                } else {
                    respuesta = `La ventana del ${lavado} ya está abierta.`
                }
            } else if (resultado.includes(salaComedor)) {
                if (ubicacionesVentana[salaComedor] === false) {
                    ubicacionesVentana[salaComedor] = true;
                    respuesta = `Abriendo ventana ${salaComedor}.`
                } else {
                    respuesta = `La ventana del ${salaComedor} ya está abierta.`
                }
            }
            else {
                respuesta = 'No se especifica cual ventana abrir.';
            }
            convertirTextoAVoz(respuesta);
            texto_resultado.textContent = respuesta;
        } else if (resultado.includes('ventana') && !manejoVentanas) {
            respuesta = 'Estan desactivadas las ventanas';
            texto_resultado.textContent = respuesta;
            convertirTextoAVoz(respuesta);
        }
    }
    if (resultado.includes('cerrar')) {
        if (resultado.includes('puerta') && manejoPuertas) {
            // primero las tres habitaciones
            if (resultado.includes(habitacion1)) {
                if (ubicacionesPuerta[habitacion1] === true) {
                    ubicacionesPuerta[habitacion1] = false;
                    respuesta = `Cerrando puerta ${habitacion1}.`
                } else {
                    respuesta = `La puerta del ${habitacion1} ya está cerrada.`
                }
            } else if (resultado.includes(habitacion2)) {
                if (ubicacionesPuerta[habitacion2] === true) {
                    ubicacionesPuerta[habitacion2] = false;
                    respuesta = `Cerrando puerta ${habitacion2}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La puerta del ${habitacion2} ya está cerrada.`
                }

            } else if (resultado.includes(habitacion3)) {
                if (ubicacionesPuerta[habitacion3] === true) {
                    ubicacionesPuerta[habitacion3] = false;
                    respuesta = `Cerrando puerta ${habitacion3}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La puerta del ${habitacion3} ya está cerrada.`
                }
            }

            else if (resultado.includes(bañoSocial)) {
                if (ubicacionesPuerta[bañoSocial] === true) {
                    ubicacionesPuerta[bañoSocial] = false;
                    respuesta = `Cerrando puerta ${bañoSocial}.`
                } else {
                    respuesta = `La puerta del ${bañoSocial} ya está cerrada.`
                }
            }
            else if (resultado.includes(bañoPrivado)) {
                if (ubicacionesPuerta[bañoPrivado] === true) {
                    ubicacionesPuerta[bañoPrivado] = false;
                    respuesta = `Cerrando puerta ${bañoPrivado}.`
                } else {
                    respuesta = `La puerta del ${bañoPrivado} ya está cerrada.`
                }

                texto_resultado.textContent = respuesta;
                convertirTextoAVoz(respuesta);
            }

        } else if (resultado.includes('puerta') && !manejoPuertas) {
            respuesta = 'Estan desactivadas las puertas';
            texto_resultado.textContent = respuesta;
            convertirTextoAVoz(respuesta);
        }
        else if (resultado.includes('ventana') && manejoVentanas) {
            if (resultado.includes(habitacion1)) {
                if (ubicacionesVentana[habitacion1] === true) {
                    ubicacionesVentana[habitacion1] = false;
                    respuesta = `Cerrando ventana ${habitacion1}.`

                } else {
                    respuesta = `La ventana del ${habitacion1} ya está cerrada.`
                }
            } else if (resultado.includes(habitacion2)) {
                if (ubicacionesVentana[habitacion2] === true) {
                    ubicacionesVentana[habitacion2] = false;
                    respuesta = `Cerrando ventana ${habitacion2}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La ventana del ${habitacion2} ya está cerrada.`
                }

            } else if (resultado.includes(habitacion3)) {
                if (ubicacionesVentana[habitacion3] === true) {
                    ubicacionesVentana[habitacion3] = false;
                    respuesta = `Cerrando ventana ${habitacion3}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La ventana del ${habitacion3} ya está cerrada.`
                }
            }

            else if (resultado.includes(bañoSocial)) {
                if (ubicacionesVentana[bañoSocial] === true) {
                    ubicacionesVentana[bañoSocial] = false;
                    respuesta = `Cerrando ventana ${bañoSocial}.`
                } else {
                    respuesta = `La ventana del ${bañoSocial} ya está cerrada.`
                }
            }
            else if (resultado.includes(bañoPrivado)) {
                if (ubicacionesVentana[bañoPrivado] === true) {
                    ubicacionesVentana[bañoPrivado] = false;
                    respuesta = `Cerrando ventana ${bañoPrivado}.`
                } else {
                    respuesta = `La ventana del ${bañoPrivado} ya está cerrada.`
                }
            } else if (resultado.includes(cocina)) {
                if (ubicacionesVentana[cocina] === true) {
                    ubicacionesVentana[cocina] = false;
                    respuesta = `Cerrando ventana ${cocina}.`
                } else {
                    respuesta = `La ventana del ${cocina} ya está cerrada.`
                }
            } else if (resultado.includes(lavado)) {
                if (ubicacionesVentana[lavado] === true) {
                    ubicacionesVentana[lavado] = false;
                    respuesta = `Cerrando ventana ${lavado}.`
                } else {
                    respuesta = `La ventana del ${lavado} ya está cerrada.`
                }
            } else if (resultado.includes(salaComedor)) {
                if (ubicacionesVentana[salaComedor] === true) {
                    ubicacionesVentana[salaComedor] = false;
                    respuesta = `Cerrando ventana ${salaComedor}.`
                } else {
                    respuesta = `La ventana del ${salaComedor} ya está cerrada.`
                }
            } else {
                respuesta = 'No se especifica cual ventana cerrar';
                convertirTextoAVoz(respuesta);
                texto_resultado.textContent = respuesta;
            }

        } else if (resultado.includes('ventana') && !manejoVentanas) {
            respuesta = 'Estan desactivadas las ventanas';
            texto_resultado.textContent = respuesta;
            convertirTextoAVoz(respuesta);
        }
    }

    if ((resultado.includes('encender') || resultado.includes('preder'))) {
        if ((resultado.includes('luces') || resultado.includes('luz')) && manejoLuces) {
            if (resultado.includes(habitacion1)) {
                if (ubicacionesLuz[habitacion1] === false) {
                    ubicacionesLuz[habitacion1] = true;
                    respuesta = `Encendiendo luz ${habitacion1}.`

                } else {
                    respuesta = `La luz del ${habitacion1} ya está encendida.`
                }
            } else if (resultado.includes(habitacion2)) {
                if (ubicacionesLuz[habitacion2] === false) {
                    ubicacionesLuz[habitacion2] = true;
                    respuesta = `Encendiendo luz ${habitacion2}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La luz del ${habitacion2} ya está encendida.`
                }

            } else if (resultado.includes(habitacion3)) {
                if (ubicacionesLuz[habitacion3] === false) {
                    ubicacionesLuz[habitacion3] = true;
                    respuesta = `Encendiendo luz ${habitacion3}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La luz del ${habitacion3} ya está encendida.`
                }
            }

            else if (resultado.includes(bañoSocial)) {
                if (ubicacionesLuz[bañoSocial] === false) {
                    ubicacionesLuz[bañoSocial] = true;
                    respuesta = `Encendiendo luz ${bañoSocial}.`
                } else {
                    respuesta = `La luz del ${bañoSocial} ya está encendida.`
                }
            }
            else if (resultado.includes(bañoPrivado)) {
                if (ubicacionesLuz[bañoPrivado] === false) {
                    ubicacionesLuz[bañoPrivado] = true;
                    respuesta = `Encendiendo luz ${bañoPrivado}.`
                } else {
                    respuesta = `La luz del ${bañoPrivado} ya está encendida.`
                }
            } else if (resultado.includes(cocina)) {
                if (ubicacionesLuz[cocina] === false) {
                    ubicacionesLuz[cocina] = true;
                    respuesta = `Encendiendo luz ${cocina}.`
                } else {
                    respuesta = `La luz del ${cocina} ya está encendida.`
                }
            } else if (resultado.includes(lavado)) {
                if (ubicacionesLuz[lavado] === false) {
                    ubicacionesLuz[lavado] = true;
                    respuesta = `Encendiendo luz ${lavado}.`
                } else {
                    respuesta = `La luz del ${lavado} ya está encendida.`
                }
            } else if (resultado.includes(salaComedor)) {
                if (ubicacionesLuz[salaComedor] === false) {
                    ubicacionesLuz[salaComedor] = true;
                    respuesta = `Encendiendo luz ${salaComedor}.`
                } else {
                    respuesta = `La luz del ${salaComedor} ya está encendida.`
                }
            } else if (resultado.includes('luces') && !manejoLuces) {
                respuesta = 'Estan desactivadas las luces';
            }
        }
    }

    if (resultado.includes('apagar')) {
        if ((resultado.includes('luces')||resultado.includes('luz')) && manejoLuces) {
            if (resultado.includes(habitacion1)) {
                if (ubicacionesLuz[habitacion1] === true) {
                    ubicacionesLuz[habitacion1] = false;
                    respuesta = `Apagando luz ${habitacion1}.`

                } else {
                    respuesta = `La luz del ${habitacion1} ya está apagada.`
                }
            } else if (resultado.includes(habitacion2)) {
                if (ubicacionesLuz[habitacion2] === true) {
                    ubicacionesLuz[habitacion2] = false;
                    respuesta = `Apagando luz ${habitacion2}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La luz del ${habitacion2} ya está apagada.`
                }

            } else if (resultado.includes(habitacion3)) {
                if (ubicacionesLuz[habitacion3] === true) {
                    ubicacionesLuz[habitacion3] = false;
                    respuesta = `Apagando luz ${habitacion3}.`
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                } else {
                    respuesta = `La luz del ${habitacion3} ya está apagada.`
                }
            }

            else if (resultado.includes(bañoSocial)) {
                if (ubicacionesLuz[bañoSocial] === true) {
                    ubicacionesLuz[bañoSocial] = false;
                    respuesta = `Apagando luz ${bañoSocial}.`
                } else {
                    respuesta = `La luz del ${bañoSocial} ya está apagada.`
                }
            }
            else if (resultado.includes(bañoPrivado)) {
                if (ubicacionesLuz[bañoPrivado] === true) {
                    ubicacionesLuz[bañoPrivado] = false;
                    respuesta = `Apagando luz ${bañoPrivado}.`
                } else {
                    respuesta = `La luz del ${bañoPrivado} ya está apagada.`
                }
            } else if (resultado.includes(cocina)) {
                if (ubicacionesLuz[cocina] === true) {
                    ubicacionesLuz[cocina] = false;
                    respuesta = `Apagando luz ${cocina}.`
                } else {
                    respuesta = `La luz del ${cocina} ya está apagada.`
                }
            } else if (resultado.includes(lavado)) {
                if (ubicacionesLuz[lavado] === true) {
                    ubicacionesLuz[lavado] = false;
                    respuesta = `Apagando luz ${lavado}.`
                } else {
                    respuesta = `La luz del ${lavado} ya está apagada.`
                }
            } else if (resultado.includes(salaComedor)) {
                if (ubicacionesLuz[salaComedor] === true) {
                    ubicacionesLuz[salaComedor] = false;
                    respuesta = `Apagando luz ${salaComedor}.`
                } else {
                    respuesta = `La luz del ${salaComedor} ya está apagada.`
                }
            } else if (resultado.includes('luces') && !manejoLuces) {
                respuesta = 'Estan desactivadas las luces';
            }
        }
    }
    texto_resultado.textContent = respuesta;
    convertirTextoAVoz(respuesta);
}

function extraerNumero(resultado) {
    const matches = resultado.match(/\d+/); // Busca uno o más dígitos en la cadena
    if (matches) {
        return matches[0]; // Retorna el primer número encontrado
        // Los numeros 2 y 4 el conocimiento de voz lo escribe en texto
    } else if (resultado.includes('dos')) {
        return 2;
    } else if (resultado.includes('cuatro')) {
        return 4;
    } else {
        return null; // Retorna null si no se encontraron números en la cadena
    }
}

function convertirTextoAVoz(texto) {
    // Comprobamos si el navegador admite la API Web Speech
    if ('speechSynthesis' in window) {

        // Creamos una instancia de SpeechSynthesisUtterance
        const speech = new SpeechSynthesisUtterance();

        // Definimos las opciones predeterminadas de la voz
        speech.lang = 'es-ES'; // Establecemos el idioma en español
        speech.pitch = 1; // Establecemos el tono en 1 (valor predeterminado)
        speech.rate = 1; // Establecemos la velocidad en 1 (valor predeterminado)
        speech.volume = 1; // Establecemos el volumen en 1 (valor predeterminado)

        // Asignamos el texto al objeto SpeechSynthesisUtterance
        speech.text = texto;

        // Agregamos el evento onend al objeto SpeechSynthesisUtterance
        speech.onend = () => {
            // Cerramos el canal de mensajes después de que se completa la conversión de texto a voz
            window.speechSynthesis.cancel();
        };

        // Llamamos a la función speak() para que comience la conversión de texto a voz
        window.speechSynthesis.speak(speech);
    } else {
        // Si el navegador no admite la API Web Speech, mostramos un mensaje de error
        alert('Lo siento, tu navegador no admite la API Web Speech');
    }
}



function cambiarPlano() {
    if (manejoPuertas) {
        for (let ubicacion in ubicacionesPuerta) {
            const elemento = document.querySelector(`.puerta${capitalizarPrimeraLetra(ubicacion.replace(/\s+/g, ''))}`);
            if (ubicacionesPuerta[ubicacion]) {
                elemento.classList.add('puerta_abierta');
            } else {
                if (document.querySelector(`.puerta${capitalizarPrimeraLetra(ubicacion.replace(/\s+/g, ''))}`))
                    elemento.classList.remove('puerta_abierta');
            }
        }
    }

    if (manejoVentanas) {
        for (let ubicacion in ubicacionesVentana) {
            const elemento = document.querySelector(`.ventana${capitalizarPrimeraLetra(ubicacion.replace(/\s+/g, ''))}`);
            if (ubicacionesVentana[ubicacion]) {
                elemento.classList.add('ventana_abierta');
            } else {
                if (document.querySelector(`.ventana${capitalizarPrimeraLetra(ubicacion.replace(/\s+/g, ''))}`))
                    elemento.classList.remove('ventana_abierta');
            }
        }
    }

    if (manejoLuces) {
        for (let ubicacion in ubicacionesLuz) {
            const elemento = document.querySelector(`.luz${capitalizarPrimeraLetra(ubicacion.replace(/\s+/g, ''))}`);
            if (ubicacionesLuz[ubicacion]) {
                elemento.classList.add('luz_encendida');
            } else {
                if (document.querySelector(`.luz${capitalizarPrimeraLetra(ubicacion.replace(/\s+/g, ''))}`))
                    elemento.classList.remove('luz_encendida');
            }
        }
    }
}

function capitalizarPrimeraLetra(cadena) {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
}