let reconocimientoDeVoz;
let apagarDespuesDe;
const tiempoMaximoSilencio = 10;
const ubicacionesPuerta = {
    'habitacion1': false,
    'habitacion2': false,
    'habitacion3': false,
    'bañoSocial': false,
    'bañoPrivado': false,
};

const ubicacionesVentana = {
    'habitacion1': false,
    'habitacion2': false,
    'habitacion3': false,
    'bañoSocial': false,
    'bañoPrivado': false,
    'cocina': false,
    'lavado':false, 
    'salaComedor':true
};

const ubicacionesLuz = {
    'habitacion1': false,
    'habitacion2': false,
    'habitacion3': false,
    'bañoSocial': false,
    'bañoPrivado': false,
    'cocina': false,
    'lavado': false,
    'salaComedor':true
}
function activarReconocimientoDeVoz() {
    const reconocimientoDeVoz = new webkitSpeechRecognition();
    reconocimientoDeVoz.lang = "es-ES";
    reconocimientoDeVoz.interimResults = true;
    reconocimientoDeVoz.maxSilence = tiempoMaximoSilencio;
    const texto = document.getElementById("mostrar");
    let ultimaLinea = "";

    reconocimientoDeVoz.onresult = function (event) {
        const resultados = event.results;
        for (let i = event.resultIndex; i < resultados.length; i++) {
            const resultado = resultados[i][0].transcript;
            texto.textContent = resultado;
            ultimaLinea = resultado;
        }
    };

    reconocimientoDeVoz.onend = function () {
        document.querySelector("button").textContent = "Activar micrófono";
        document.querySelector("button").onclick = function () { activarReconocimientoDeVoz() };
        if(ultimaLinea != ""){
            procesarResultado(ultimaLinea);
            cambiarPlano();
            
        }
    }

    reconocimientoDeVoz.start();

    document.querySelector("button").textContent = "Escuchando ando ...";
    // document.querySelector("button").onclick = function () { desactivarReconocimientoDeVoz() };
}
// function desactivarReconocimientoDeVoz() {
//     reconocimientoDeVoz.stop();
//     document.querySelector("button").textContent = "Activar micrófono";
//     document.querySelector("button").onclick = function () { activarReconocimientoDeVoz() };
//     clearTimeout(apagarDespuesDe);
// }


function procesarResultado(resultado) {
    resultado = resultado.toLowerCase();
    const numero = extraerNumero(resultado);
    const texto_resultado = document.getElementById("resulado");
    var respuesta = "No se reconoce el comando";
    // Codigo abrir puerta
    if (resultado.includes('abrir')) {
        if (resultado.includes('puerta') && manejoPuertas) {
            if (resultado.includes('habitación')) {
                if (numero) {
                    if (numero <= 3) {
                        const habitacion = `habitacion${numero}`;
                        if (ubicacionesPuerta[habitacion] === false) {
                            respuesta = `Abriendo puerta habitación ${numero}.`;
                            ubicacionesPuerta[habitacion] = true;
                        } else {
                            respuesta = `La puerta de la habitación ${numero} ya está abierta.`;
                        }
                    } else {
                        respuesta = `La habitación ${numero} no existe. `;
                    }
                } else {
                    respuesta = 'No se especifica la habitación.';
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                    
                }
                texto_resultado.textContent = respuesta;
                convertirTextoAVoz(respuesta);
            } else if (resultado.includes('baño')) {
                if (resultado.includes('social')) {
                    if (ubicacionesPuerta.bañoSocial === false) {
                        ubicacionesPuerta.bañoSocial = true;
                        respuesta = 'Abriendo puerta del baño social.';
                        console.log(respuesta);
                    } else {
                        respuesta = 'La puerta del baño social ya está abierta.';
                    }
                } else if (resultado.includes('privado')) {
                    if (ubicacionesPuerta.bañoPrivado === false) {
                        ubicacionesPuerta.bañoPrivado = true;
                        respuesta = 'Abriendo puerta del baño privado.';
                    } else {
                        respuesta = 'La puerta del baño privado ya está abierta.';
                    }
                } else {
                    respuesta = 'No se especifica el baño.';
                }
                texto_resultado.textContent = respuesta;
                convertirTextoAVoz(respuesta);
            }
        } else if (resultado.includes('puerta') && !manejoPuertas){
            respuesta = 'Estan desactivadas las puertas';
            texto_resultado.textContent = respuesta;
            convertirTextoAVoz(respuesta);
        } else if (resultado.includes('ventana')) {
            if (resultado.includes('habitación')) {
                const numeroHabitacion = extraerNumero(resultado);
                if (numeroHabitacion) {
                    if (numeroHabitacion <= 3) {
                        const habitacion = `habitacion${numeroHabitacion}`;
                        if (ubicacionesVentana[habitacion] === false) {
                            ubicacionesVentana[habitacion] = true;
                            respuesta = `Abriendo ventana de la habitación ${numeroHabitacion}.`;
                        } else {
                            respuesta = `La ventana de la habitación ${numeroHabitacion} ya está abierta.`;
                        }
                    } else {
                        respuesta = `La habitación ${numeroHabitacion} no existe. `;
                    }
                } else {
                    respuesta = "No se especifina el numero de la habitacion"
                }
            } else if (resultado.includes('baño')) {
                if (resultado.includes('social')) {
                    if (ubicacionesVentana.bañoSocial === false) {
                        ubicacionesVentana.bañoSocial = true;
                        respuesta = 'Abriendo ventana del baño social.';
                    } else {
                        respuesta = 'La ventana del baño social ya está abierta.';
                    }
                } else if (resultado.includes('privado')) {
                    if (ubicacionesVentana.bañoPrivado === false) {
                        ubicacionesVentana.bañoPrivado = true;
                        respuesta = 'Abriendo ventana del baño privado.';
                    } else {
                        respuesta = 'La ventana del baño privado ya está abierta.';
                    }
                } else {
                    respuesta = 'No se especifica el baño.';
                }
            } else if (resultado.includes('cocina')) {
                if (ubicacionesVentana.cocina === false) {
                    ubicacionesVentana.cocina = true;
                    respuesta = 'Abriendo ventana de la cocina.';
                } else {
                    respuesta = 'La ventana de la cocina ya está abierta.';
                }
            } else {
                respuesta = 'No se especifica cual ventana abrir.';
            }
            convertirTextoAVoz(respuesta);
            texto_resultado.textContent = respuesta;
        }
    }
    if (resultado.includes('cerrar')) {
        if (resultado.includes('puerta')) {
            // primero las tres habitaciones
            if (resultado.includes('habitación')) {
                if (numero) {
                    if (numero <= 3) {
                        const habitacion = `habitacion${numero}`;
                        if (ubicacionesPuerta[habitacion] === true) {
                            respuesta = `Cerrando puerta habitación ${numero}.`;
                            ubicacionesPuerta[habitacion] = false;
                        } else {
                            respuesta = `La puerta de la habitación ${numero} ya está cerrada.`;
                        }
                    } else {
                        respuesta = `La habitación ${numero} no existe. `;
                    }
                } else {
                    respuesta = 'No se especifica la habitación.';
                    texto_resultado.textContent = respuesta;
                    convertirTextoAVoz(respuesta);
                }
                texto_resultado.textContent = respuesta;
                convertirTextoAVoz(respuesta);
            } else if (resultado.includes('baño')) {
                if (resultado.includes('social')) {
                    if (ubicacionesPuerta.bañoSocial === true) {
                        ubicacionesPuerta.bañoSocial = false;
                        respuesta = 'Cerrando puerta del baño social.';
                        console.log(respuesta);
                    } else {
                        respuesta = 'La puerta del baño social ya está cerrada.';
                    }
                } else if (resultado.includes('privado')) {
                    if (ubicacionesPuerta.bañoPrivado === true) {
                        ubicacionesPuerta.bañoPrivado = false;
                        respuesta = 'Cerrando puerta del baño privado.';
                    } else {
                        respuesta = 'La puerta del baño privado ya está cerrada.';
                    }
                } else {
                    respuesta = 'No se especifica el baño.';
                }
                texto_resultado.textContent = respuesta;
                convertirTextoAVoz(respuesta);
            }
            // revisamos el cerrar ventanas    
        } else if (resultado.includes('ventana')) {
            if (resultado.includes('habitación')) {
                const numeroHabitacion = extraerNumero(resultado);
                if (numeroHabitacion) {
                    if (numeroHabitacion <= 3) {
                        const habitacion = `habitacion${numeroHabitacion}`;
                        if (ubicacionesVentana[habitacion] === true) {
                            ubicacionesVentana[habitacion] = false;
                            respuesta = `Cerrando ventana de la habitación ${numeroHabitacion}.`;
                        } else {
                            respuesta = `La ventana de la habitación ${numeroHabitacion} ya está cerrada.`;
                        }
                    } else {
                        respuesta = `La habitación ${numeroHabitacion} no existe. `;
                    }
                } else {
                    respuesta = "No se especifina el numero de la habitacion"
                }
                texto_resultado.textContent = respuesta;
                convertirTextoAVoz(respuesta);
            } else if (resultado.includes('baño')) {
                if (resultado.includes('social')) {
                    if (ubicacionesVentana.bañoSocial === true) {
                        ubicacionesVentana.bañoSocial = false;
                        respuesta = 'Cerrando ventana del baño social.';
                    } else {
                        respuesta = 'La ventana del baño social ya está cerrada.';
                    }
                } else if (resultado.includes('privado')) {
                    if (ubicacionesVentana.bañoPrivado === true) {
                        ubicacionesVentana.bañoPrivado = false;
                        respuesta = 'Cerrando ventana del baño privado.';
                    } else {
                        respuesta = 'La ventana del baño privado ya está cerrada.';
                    }
                } else {
                    respuesta = 'No se especifica el baño';
                    convertirTextoAVoz(respuesta);
                    texto_resultado.textContent = respuesta;
                }
                convertirTextoAVoz(respuesta);
                texto_resultado.textContent = respuesta;
            } else if (resultado.includes('cocina')) {
                if (ubicacionesVentana.cocina === true) {
                    ubicacionesVentana.cocina = false;
                    respuesta = 'Cerrando ventana de la cocina.';
                } else {
                    respuesta = 'La ventana de la cocina ya está cerrada.';
                }
                convertirTextoAVoz(respuesta);
                texto_resultado.textContent = respuesta;
            } else {
                respuesta = 'No se especifica cual ventana cerrar';
                convertirTextoAVoz(respuesta);
                texto_resultado.textContent = respuesta;
            }

        }
    }

    if (resultado.includes('encender')||resultado.includes('preder')) {
        if (resultado.includes('luces')||resultado.includes('luz')) {
            if (resultado.includes('habitación')) {
                const numeroHabitacion = extraerNumero(resultado);
                if (numeroHabitacion) {
                    if (numeroHabitacion <= 3) {
                        const habitacion = `habitacion${numeroHabitacion}`;
                        if (ubicacionesLuz[habitacion] === false) {
                            ubicacionesLuz[habitacion] = true;
                            respuesta = `Encendiendo luz de la habitación ${numeroHabitacion}.`;
                        } else {
                            respuesta = `Las luz de la habitación ${numeroHabitacion} ya están encendidas.`;
                        }
                    } else {
                        respuesta = `La habitación ${numeroHabitacion} no existe. `;
                    }
                } else {
                    respuesta = "No se especifica la habitación"
                }
            } else if (resultado.includes('baño')) {
                if (resultado.includes('social')) {
                    if (ubicacionesLuz.bañoSocial === false) {
                        ubicacionesLuz.bañoSocial = true;
                        respuesta = 'Encendiendo luz del baño social.';
                    } else {
                        respuesta = 'La luz del baño social ya está encendida.';
                    }
                } else if (resultado.includes('privado')) {
                    if (ubicacionesLuz.bañoPrivado === false) {
                        ubicacionesLuz.bañoPrivado = true;
                        respuesta = 'Encendiendo luz del baño privado.';
                    } else {
                        respuesta = 'La luz del baño privado ya está encendida.';
                    }
                } else {
                    respuesta = 'No se especifica el baño.';
                }
            } else if (resultado.includes('cocina')) {
                if (ubicacionesLuz.cocina === false) {
                    ubicacionesLuz.cocina = true;
                    respuesta = 'Encendiendo luz de la cocina.';
                } else {
                    respuesta = 'La luz de la cocina ya está encendida.';
                }
            } else if (resultado.includes('lavado')) {
                if (ubicacionesLuz.lavado === false) {
                    ubicacionesLuz.lavado = true;
                    respuesta = "Encenciendo luz del lavado.";
                } else {
                    respuesta = 'La luz del lavado ya está encendida.'
                }
            } else {
                respuesta = 'No se especifica cual luz encender.';
            }
            convertirTextoAVoz(respuesta);
            texto_resultado.textContent = respuesta;
        }
    }

    if (resultado.includes('apagar')) {
        if (resultado.includes('luces')) {
            if (resultado.includes('habitación')) {
                const numeroHabitacion = extraerNumero(resultado);
                if (numeroHabitacion) {
                    if (numeroHabitacion <= 3) {
                        const habitacion = `habitacion${numeroHabitacion}`;
                        if (ubicacionesLuz[habitacion] === true) {
                            ubicacionesLuz[habitacion] = false;
                            respuesta = `Apagando luz de la habitación ${numeroHabitacion}.`;
                        } else {
                            respuesta = `La luz de la habitación ${numeroHabitacion} ya está apagada.`;
                        }
                    } else {
                        respuesta = `La habitación ${numeroHabitacion} no existe. `;
                    }
                } else {
                    respuesta = "No se especifica la habitación."
                }
            } else if (resultado.includes('baño')) {
                if (resultado.includes('social')) {
                    if (ubicacionesLuz.bañoSocial === true) {
                        ubicacionesLuz.bañoSocial = false;
                        respuesta = 'Apagando luz del baño social.';
                    } else {
                        respuesta = 'La luz del baño social ya está apagada.';
                    }
                } else if (resultado.includes('privado')) {
                    if (ubicacionesLuz.bañoPrivado === true) {
                        ubicacionesLuz.bañoPrivado = false;
                        respuesta = 'Apagando luz del baño privado.';
                    } else {
                        respuesta = 'La luz del baño privado ya está apagada.';
                    }
                } else {
                    respuesta = 'No se especifica el baño.';
                }
            } else if (resultado.includes('cocina')) {
                if (ubicacionesLuz.cocina === true) {
                    ubicacionesLuz.cocina = false;
                    respuesta = 'Apagando luz de la cocina.';
                } else {
                    respuesta = 'La luz de la cocina ya está apagada.';
                }
            } else if (resultado.includes('lavado')) {
                if (ubicacionesLuz.lavado === true) {
                    ubicacionesLuz.lavado = false;
                    respuesta = "Apagando luz del lavado.";
                } else {
                    respuesta = 'La luz del lavado ya está apagada.'
                }
            }else if (resultado.includes('todas')){
                for (let ubicacion in ubicacionesPuerta) {
                    ubicacionesPuerta[ubicacion]= false;
                }
            
            } else {
                respuesta = 'No se especifica cual luz apagar.';
            }
            convertirTextoAVoz(respuesta);
            texto_resultado.textContent = respuesta;
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
    if(manejoPuertas){
        for (let ubicacion in ubicacionesPuerta) {
            const elemento = document.querySelector(`.puerta${capitalizarPrimeraLetra(ubicacion)}`);         
            if (ubicacionesPuerta[ubicacion]) {
                elemento.classList.add('puerta_abierta');
            } else {
                elemento.classList.remove('puerta_abierta');
            }
        }
    }

    for (let ubicacion in ubicacionesVentana) {
        const elemento = document.querySelector(`.ventana${capitalizarPrimeraLetra(ubicacion)}`);         
        if (ubicacionesVentana[ubicacion]) {
            elemento.classList.add('ventana_abierta');
        } else {
            elemento.classList.remove('ventana_abierta');
        }
    }

    for (let ubicacion in ubicacionesLuz) {
        const elemento = document.querySelector(`.luz${capitalizarPrimeraLetra(ubicacion)}`);  
        if (ubicacionesLuz[ubicacion]) {
            elemento.classList.add('luz_encendida');
        } else {
            elemento.classList.remove('luz_encendida');
        }
    }
}

function capitalizarPrimeraLetra(cadena) {
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
  }