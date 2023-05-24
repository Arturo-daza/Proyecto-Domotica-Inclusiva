import serial

import time
from controllerBD import listaLugares



def enviarArduino(ubicaionesPuerta, ubicacionesLuz, ubicacionesVentana):
    lugaresPlano = listaLugares()
        
    arduino=serial.Serial('COM3',9600)      
    time.sleep(2)
#     Luces
    if ubicacionesLuz[lugaresPlano[0]['habitacion1'].lower()]==True:
            print("Principal LuzEncendida")
            arduino.write(b'q')
    elif ubicacionesLuz[lugaresPlano[0]['habitacion1'].lower()]==False:
            print("Principal Apagada")
            arduino.write(b'w')
    if ubicacionesLuz[lugaresPlano[0]['habitacion2'].lower()]==True:
            print("Estudio enecendido")
            arduino.write(b'e')
    elif ubicacionesLuz[lugaresPlano[0]['habitacion2'].lower()]==False:
            print("Estudio Apagada")
            arduino.write(b'r')
    if ubicacionesLuz[lugaresPlano[0]['bañoSocial'].lower()]==True:
            print("Luz Baño enecendido")
            arduino.write(b't')
    elif ubicacionesLuz[lugaresPlano[0]['bañoSocial'].lower()]==False:
            print("Luz Baño  Apagada")
            arduino.write(b'y')
    if ubicacionesLuz[lugaresPlano[0]['salaComedor'].lower()]==True:
            print("Luz sala enecendido")
            arduino.write(b'u')
    elif ubicacionesLuz[lugaresPlano[0]['salaComedor'].lower()]==False:
            print("Luz sala  Apagada")
            arduino.write(b'i')

# PUERTAS
    if ubicaionesPuerta[lugaresPlano[0]['habitacion1'].lower()]==True:
            print("Puerta principales abierta")
            arduino.write(b'o')
    elif ubicaionesPuerta[lugaresPlano[0]['habitacion1'].lower()]==False:
            print("Puerta cerrada  Apagada")
            arduino.write(b'p')
    if ubicaionesPuerta[lugaresPlano[0]['habitacion2'].lower()]==True:
            print("Puerta estudio abierta")
            arduino.write(b'a')
    elif ubicaionesPuerta[lugaresPlano[0]['habitacion2'].lower()]==False:
            print("Puerta estudio cerrada ")
            arduino.write(b's')
    if ubicaionesPuerta[lugaresPlano[0]['bañoSocial'].lower()]==True:
            print("Puerta baño social abierta")
            arduino.write(b'd')
    elif ubicaionesPuerta[lugaresPlano[0]['bañoSocial'].lower()]==False:
            print("Puerta baño social cerrada ")
            arduino.write(b'f')

    ## VENTANAS 
    if ubicacionesVentana[lugaresPlano[0]['habitacion1'].lower()]==True:
            print("Ventanta principales abierta")
            arduino.write(b'g')
    elif ubicacionesVentana[lugaresPlano[0]['habitacion1'].lower()]==False:
            print("Ventanta principale  Cerrada")
            arduino.write(b'h')

    if ubicacionesVentana[lugaresPlano[0]['habitacion2'].lower()]==True:
            print("Ventanta estudio abierta")
            arduino.write(b'j')
    elif ubicacionesVentana[lugaresPlano[0]['habitacion2'].lower()]==False:
            print("Ventanta estudio  Cerrada")
            arduino.write(b'k')


    if ubicacionesVentana[lugaresPlano[0]['salaComedor'].lower()]==True:
            print("Ventanta sala abierta")
            arduino.write(b'l')
    elif ubicacionesVentana[lugaresPlano[0]['salaComedor'].lower()]==False:
            print("Ventanta sala  Cerrada")
            arduino.write(b'z')
    
    if ubicacionesVentana[lugaresPlano[0]['bañoSocial'].lower()]==True:
            print("Ventanta baño social abierta")
            arduino.write(b'x')
    elif ubicacionesVentana[lugaresPlano[0]['bañoSocial'].lower()]==False:
            print("Ventanta baño social  Cerrada")
            arduino.write(b'c')