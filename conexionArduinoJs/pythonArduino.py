import serial

# Definir el puerto serial y la velocidad
puerto = 'COM5' # Reemplazar con el puerto en el que se conectó el Arduino
velocidad = 9600

# Abrir la conexión serial
conexion = serial.Serial(puerto, velocidad)

# Leer los datos enviados por el Arduinoq

while True:
    linea = input("Ingresa Comando")
    conexion.write(linea.encode())
    if conexion.in_waiting > 0:
        datos = conexion.readline().decode().strip()
        print(datos)