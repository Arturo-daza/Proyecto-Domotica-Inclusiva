#include <Servo.h>
  Servo myservo1;
  Servo myservo2;
  Servo myservo3;
  int luzHab1 = 2;
  int luzHab2 = 3;
  int luzBano = 4;
  int luzSala= 5; 
  int ventanaHab1 = 6;
  int ventanaHab2 = 7;
  int ventanaSala = 8;
  int ventanaBano = 12;
  char option;


  void setup() {
    // Configura el pin como salida
    myservo1.attach(9);
    myservo2.attach(10);
    myservo3.attach(11);
    pinMode(luzHab1, OUTPUT);
    pinMode(luzHab2, OUTPUT);
    pinMode(luzBano, OUTPUT);
    pinMode(luzSala, OUTPUT);
    pinMode(ventanaHab1, OUTPUT);
    pinMode(ventanaHab2, OUTPUT);
    pinMode(ventanaSala, OUTPUT);
    pinMode(ventanaBano, OUTPUT);
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
          digitalWrite(luzBano, HIGH);
          Serial.println("Habitacion 3 Luz encendida");
          break;
        case 'y':
          digitalWrite(luzBano, LOW);
          Serial.println("Habitacion 3 Luz apagada");
          break;
        //4
        case 'u':
          digitalWrite(luzSala, HIGH);
          Serial.println("Baño Social Luz encendida");
          break;
        case 'i':
          digitalWrite(luzSala, LOW);
          Serial.println("Baño Social Luz apagada");
          break;

        //5
        case 'o':
          myservo1.write(90);       // mueve el servo hacia la posición 90 grados
          delay(300);  
          Serial.println("Bgu");
          break;
        case 'p':
          myservo1.write(0);       // mueve el servo hacia la posición 90 grados
          delay(300);  
          Serial.println("gyuygu");
          break;
        
        
        case 'a':
          myservo2.write(90);       // mueve el servo hacia la posición 90 grados
          delay(300);  
          Serial.println("Bgu");
          break;
        case 's':
          myservo2.write(0);       // mueve el servo hacia la posición 90 grados
          delay(300);  
          Serial.println("gyuygu");
          break;
        
        case 'd':
          myservo3.write(90);       // mueve el servo hacia la posición 90 grados
          delay(300);  
          Serial.println("Bgu");
          break;
        case 'f':
          myservo3.write(0);       // mueve el servo hacia la posición 90 grados
          delay(300);  
          Serial.println("gyuygu");
          break;
      
          
        //7
        case 'g':
          digitalWrite(ventanaHab1, HIGH);
          Serial.println("Ventana 1 abierta");
          break;
        case 'h':
          digitalWrite(ventanaHab1, LOW);
          Serial.println("Ventana 1 Cerrada");
          break;
        //8
        case 'j':
          digitalWrite(ventanaHab2, HIGH);
          Serial.println("Ventana 1 abierta");
          break;
        case 'k':
          digitalWrite(ventanaHab2, LOW);
          Serial.println("Ventana 1 Cerrada");
          break;
        //9
        case 'l':
          digitalWrite(ventanaSala, HIGH);
          Serial.println("Ventana 1 abierta");
          break;
        case 'z':
          digitalWrite(ventanaSala, LOW);
          Serial.println("Ventana 1 Cerrada");
          break;
        //10
        case 'x':
          digitalWrite(ventanaBano, HIGH);
          Serial.println("Luz baño encendida");
          break;
        case 'c':
          digitalWrite(ventanaBano, LOW);
          Serial.println("Luz baño encendida");
          break;
      


      }
    }
  }
