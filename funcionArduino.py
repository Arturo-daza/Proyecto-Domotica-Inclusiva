import serial



def enviarArduino(ubicaionesPuerta, ubicacionesLuz, ubicacionesVentana):
    print(ubicacionesLuz)    
    arduino=serial.Serial('COM5',9600)      
    if ubicacionesLuz['principales']==True:
            arduino.open()
            print("Principal LuzEncendida")
            for i in range(1, 50):
             arduino.write(b'q')
             arduino.close()  
           
    elif ubicacionesLuz['principales']==False:
            arduino.open()
            print("Principal Apagada")
            for i in range(1, 50):
             arduino.write(b'w')
            arduino.close()    
    else:
        print("AyudaDios")


# def enviarArduino(ubicacionesPuerta, ubicacionesLuz, ubicacionesVentana):
#     print(ubicacionesLuz)
#     arduino = serial.Serial('COM5', 9600)
    
#     if ubicacionesLuz['principales'] == True:
#         print("Principal Luz Encendida")
#         for i in range(1, 50):
#             arduino.open()
#             arduino.write(b'q')
#             arduino.close()
           
#     elif ubicacionesLuz['principales'] == False:
#         print("Principal Apagada")
#         for i in range(1, 50):
#             arduino.open()
#             arduino.write(b'w')
#             arduino.close()
    
#     else:
#         print("AyudaDios")


# arduino=serial.Serial('COM5',9600) 
# def enviarArduino(ubicaionesPuerta, ubicacionesLuz, ubicacionesVentana):
#     print(ubicacionesLuz)    
#     if ubicacionesLuz['principales']==True:
#             arduino.open()
#             print("Principal LuzEncendida")
#             for i in range(1, 50):
#              arduino.write(b'q')
#              arduino.close()  
           
#     elif ubicacionesLuz['principales']==False:
#             arduino.open()
#             print("Principal Apagada")
#             for i in range(1, 50):
#              arduino.write(b'w')
#             arduino.close()    
#     else:
#         print("AyudaDios")

   
    
  
   