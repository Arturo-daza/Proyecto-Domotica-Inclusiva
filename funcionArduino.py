import serial

def enviarArduino(ubicaionesPuerta, ubicacionesLuz, ubicacionesVentana):
    print(ubicacionesLuz)
        
   

     
    if ubicacionesLuz['principales']==True:
            arduino=serial.Serial('COM5',9600) 
            print("Principal LuzEncendida")
            for i in range(1, 50):
             arduino.write(b'q')
           
    elif ubicacionesLuz['principales']==False:
            arduino.open()
            print("Principal Apagada")
            for i in range(1, 50):
             arduino.write(b'w')
            arduino.close()
           
                   
            
    else:
        print("AyudaDios")

   
    
  
   