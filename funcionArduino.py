import serial

def enviarArduino(ubicaionesPuerta, ubicacionesLuz, ubicacionesVentana):
    print(ubicacionesLuz)
        
    arduino=serial.Serial('COM5',9600)

     
    if ubicacionesLuz['principales']==True:
            print("Principal LuzEncendida")
            arduino.write(b'q')
    if ubicacionesLuz['principales']==False:
            print("Principal LuzApagada")   
            arduino.write(b'w')
    if ubicacionesLuz['estudio']==True:
            print("estudio LuzEncendida")
            arduino.write(b's')
    if ubicacionesLuz['estudio']==False:
            print("estudio LuzApagada")
            arduino.write(b'l')
  
   