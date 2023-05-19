import serial

import serial
import time



def enviarArduino(ubicaionesPuerta, ubicacionesLuz, ubicacionesVentana):
    arduino=serial.Serial('COM3',9600)      
    time.sleep(2)
    if ubicacionesLuz['principales']==True:
            print("Principal LuzEncendida")
            arduino.write(b'P')
            time.sleep(2)
    elif ubicacionesLuz['principales']==False:
            print("Principal Apagada")
            arduino.write(b'N')
            time.sleep(2)
