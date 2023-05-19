// Declara el número del pin donde está conectado el LED
#include <Servo.h>
Servo myservo1;
Servo myservo2;
int luzHab1 = 2;
int luzHab2 = 3;
int luzHab3 = 4;
int puertaHab1 = 11;
int ventanaHab1 = 12;
int ventanaHab2 = 7;
int ventanaHab3 = 8;
int ventiladorHab1 = 9;
int ventiladorHab2 = 10;



char option;


void setup() {
  // Configura el pin como salida
  myservo1.attach(5);
  myservo2.attach(12);
  pinMode(luzHab1, OUTPUT);
  pinMode(luzHab2, OUTPUT);
  pinMode(luzHab3, OUTPUT);
 
  
  pinMode(ventanaHab1, OUTPUT);
  pinMode(ventanaHab2, OUTPUT);
  pinMode(ventanaHab3, OUTPUT);
  pinMode(ventiladorHab1, OUTPUT);
  pinMode(ventiladorHab2, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  

 
  if (Serial.available() > 0) {
    option = Serial.read();

    switch (option) {
      //1
      case 'q':
        digitalWrite(luzHab1, HIGH);
        Serial.println("Habitacion 1 Luz encendida");
        break;
      case 'w':
        digitalWrite(luzHab1, LOW);
        Serial.println("Habitacion 1 Luz apagada");
        break;
      //2
      case 'e':
        digitalWrite(luzHab2, HIGH);
        Serial.println("Habitacion 2 Luz encendida");
        break;
      case 'r':
        digitalWrite(luzHab2, LOW);
        Serial.println("Habitacion 2 Luz apagada");
        break;
      case 't':
        //3
        digitalWrite(luzHab3, HIGH);
        Serial.println("Habitacion 3 Luz encendida");
        break;
      case 'y':
        digitalWrite(luzHab3, LOW);
        Serial.println("Habitacion 3 Luz apagada");
        break;
      //4
      case 'u':
        digitalWrite(puertaHab1, HIGH);
        Serial.println("Baño Social Luz encendida");
        break;
      case 'i':
        digitalWrite(puertaHab1, LOW);
        Serial.println("Baño Social Luz apagada");
        break;

      //5
      case 'o':
         myservo1.write(90);       // mueve el servo hacia la posición 90 grados
         delay(300);  
        Serial.println("Baño Social Luz encendida");
        break;
      case 'p':
        myservo1.write(0);       // mueve el servo hacia la posición 90 grados
        delay(300);  
        Serial.println("Baño Social Luz apagada");
        break;
     
        
      //7
      case 'd':
        digitalWrite(ventanaHab1, HIGH);
        Serial.println("Ventana 1 abierta");
        break;
      case 'f':
        digitalWrite(ventanaHab1, LOW);
        Serial.println("Ventana 1 Cerrada");
        break;
      //8
      case 'g':
        digitalWrite(ventanaHab2, HIGH);
        Serial.println("Ventana 1 abierta");
        break;
      case 'h':
        digitalWrite(ventanaHab2, LOW);
        Serial.println("Ventana 1 Cerrada");
        break;
      //9
      case 'j':
        digitalWrite(ventanaHab3, HIGH);
        Serial.println("Ventana 1 abierta");
        break;
      case 'k':
        digitalWrite(ventanaHab3, LOW);
        Serial.println("Ventana 1 Cerrada");
        break;
      //10
     


    }




  }


}
