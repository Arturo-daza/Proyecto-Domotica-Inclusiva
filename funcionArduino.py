import serial

ser = serial.Serial('COM5', 9600,timeout=1)
ser.write(b'a')
def enviarArduino(ubicaionesPuerta, ubicacionesLuz, ubicacionesVentana):
    print(ubicacionesLuz)


     
    if ubicacionesLuz['principales']==True:
            print("Principal LuzEncendida")
            ser.write(b'q')
    if ubicacionesLuz['principales']==False:
            print("Principal LuzApagada")   
            ser.write(b'w')
    if ubicacionesLuz['estudio']==True:
            print("estudio LuzEncendida")
    if ubicacionesLuz['estudio']==False:
            print("estudio LuzApagada")
    if ubicacionesLuz['habitación 3']==True:
            print("habitacion 3 Luz Encendida")
    if ubicacionesLuz['habitación 3']==False:
            print("habitacion 3 LuzApagada")


    if ubicaionesPuerta['principales']==True:
            print("PuertaPrincipal abierta")
    if ubicaionesPuerta['principales']==False:
            print("PuertaPrincipal cerrada")   
    if ubicaionesPuerta['estudio']==True:
            print("Puerta estudio abierta")
    if ubicaionesPuerta['estudio']==False:
            print("Puerta estudio cerrada")

    if ubicaionesPuerta['habitación 3']==True:
            print("Puerta habitación 3 abierta")
    if ubicaionesPuerta['habitación 3']==False:
            print("habitacion 3 LuzApagada")
    

    if ubicacionesVentana['principales']==True:
            print("Ventana Principal Abierta")
    if ubicacionesVentana['principales']==False:
            print("Ventana Principal Cerrada")   
    if ubicacionesVentana['estudio']==True:
            print("Ventana estudio abierta")
    if ubicacionesVentana['estudio']==False:
            print("Ventana estudio cerrada")

    if ubicacionesVentana['habitación 3']==True:
            print("ventana habitacion 3 abierta")
    if ubicacionesVentana['habitación 3']==False:
            print("ventana habitacion 3 cerrada")
        
        


        