import serial

import time



def enviarArduino(ubicaionesPuerta, ubicacionesLuz, ubicacionesVentana):
    arduino=serial.Serial('COM5',9600)      
    time.sleep(2)
#     Luces
    if ubicacionesLuz['principales']==True:
            print("Principal LuzEncendida")
            arduino.write(b'q')
    elif ubicacionesLuz['principales']==False:
            print("Principal Apagada")
            arduino.write(b'w')
    if ubicacionesLuz['estudio']==True:
            print("Estudio enecendido")
            arduino.write(b'e')
    elif ubicacionesLuz['estudio']==False:
            print("Estudio Apagada")
            arduino.write(b'r')
    if ubicacionesLuz['baño social']==True:
            print("Luz Baño enecendido")
            arduino.write(b't')
    elif ubicacionesLuz['baño social']==False:
            print("Luz Baño  Apagada")
            arduino.write(b'y')
    if ubicacionesLuz['sala']==True:
            print("Luz sala enecendido")
            arduino.write(b'u')
    elif ubicacionesLuz['sala social']==False:
            print("Luz sala  Apagada")
            arduino.write(b'i')

# PUERTAS
    if ubicaionesPuerta['principales']==True:
            print("Puerta principales abierta")
            arduino.write(b'o')
    elif ubicaionesPuerta['principales']==False:
            print("Puerta cerrada  Apagada")
            arduino.write(b'p')
    if ubicaionesPuerta['estudio']==True:
            print("Puerta estudio abierta")
            arduino.write(b'a')
    elif ubicaionesPuerta['estudio']==False:
            print("Puerta estudio cerrada ")
            arduino.write(b's')
    if ubicaionesPuerta['baño social']==True:
            print("Puerta baño social abierta")
            arduino.write(b'd')
    elif ubicaionesPuerta['baño social']==False:
            print("Puerta baño social cerrada ")
            arduino.write(b'f')

    ## VENTANAS 
    if ubicacionesVentana['principales']==True:
            print("Ventanta principales abierta")
            arduino.write(b'g')
    elif ubicacionesVentana['principales']==False:
            print("Ventanta principale  Cerrada")
            arduino.write(b'h')

    if ubicacionesVentana['estudio']==True:
            print("Ventanta estudio abierta")
            arduino.write(b'j')
    elif ubicacionesVentana['estudio']==False:
            print("Ventanta estudio  Cerrada")
            arduino.write(b'k')


    if ubicacionesVentana['sala']==True:
            print("Ventanta sala abierta")
            arduino.write(b'l')
    elif ubicacionesVentana['sala']==False:
            print("Ventanta sala  Cerrada")
            arduino.write(b'z')
    
    if ubicacionesVentana['baño social']==True:
            print("Ventanta baño social abierta")
            arduino.write(b'x')
    elif ubicacionesVentana['baño social']==False:
            print("Ventanta baño social  Cerrada")
            arduino.write(b'c')