// Declara el número del pin donde está conectado el LED
int luzHab1 = 1;
int luzHab2 = 2;
int luzHab3 = 3;
int puertaHab1 = 4;
int puertaHab2 = 5;
int puertaHab3  = 6;
int ventanaHab1 = 7;
int ventanaHab2 = 8;
int ventanaHab3 = 9;
int ventiladorHab1 = 10;
int ventiladorHab2 = 11;



char option;


void setup() {
  // Configura el pin como salida
  pinMode(luzHab1, OUTPUT);
  pinMode(luzHab2, OUTPUT);
  pinMode(luzHab3, OUTPUT);
  pinMode(puertaHab1, OUTPUT);
  pinMode(puertaHab2, OUTPUT);
  pinMode(puertaHab3, OUTPUT);
  pinMode(ventanaHab1, OUTPUT);
  pinMode(ventanaHab2, OUTPUT);
  pinMode(ventanaHab3, OUTPUT);
  pinMode(ventiladorHab1, OUTPUT);
  pinMode(ventiladorHab2, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  int sensorApuerta1 = analogRead(A1);
  int sensorApuerta2 = analogRead(A2);
  int sensorBpuerta1 = analogRead(A3);
  int sensorBpuerta2 = analogRead(A4);
  int valor_analogico = analogRead(A0);
  Serial.println(sensorApuerta1);
  if (sensorApuerta1 > 1000 ) {
    Serial.println("Puerta Habitacion 1 Abierta");
  }

  if (sensorBpuerta1 > 800 and sensorApuerta1 < 400) {
    Serial.println("Puerta Habitacion 1 Cerrada");
  }

  if (sensorApuerta2 > 800 and sensorBpuerta2 < 400) {
    Serial.println("Puerta Habitacion 2 Abierta");
  }

  if (sensorBpuerta2 > 800 and sensorApuerta2 < 400) {
    Serial.println("Puerta Habitacion 2 Abierta");
    delay(400);
  }

  if (Serial.available() > 0) {
    option = Serial.read();

    switch (option) {
      //1
      case 'q':
        pinMode(luzHab1, HIGH);
        Serial.println("Baño Social Luz encendida");
        break;
      case 'w':
        pinMode(luzHab1, LOW);
        Serial.println("Baño Social Luz apagada");
        break;
      //2
      case 'e':
        pinMode(luzHab2, HIGH);
        Serial.println("Baño Social Luz encendida");
        break;
      case 'r':
        pinMode(luzHab2, LOW);
        Serial.println("Baño Social Luz apagada");
        break;
      case 't':
        //3
        pinMode(luzHab3, HIGH);
        Serial.println("Baño Social Luz encendida");
        break;
      case 'y':
        pinMode(luzHab3, LOW);
        Serial.println("Baño Social Luz apagada");
        break;
      //4
      case 'u':
        pinMode(puertaHab1, HIGH);
        Serial.println("Baño Social Luz encendida");
        break;
      case 'i':
        pinMode(puertaHab1, LOW);
        Serial.println("Baño Social Luz apagada");
        break;

      //5
      case 'o':
        pinMode(puertaHab2, HIGH);
        Serial.println("Baño Social Luz encendida");
        break;
      case 'p':
        pinMode(puertaHab2, LOW);
        Serial.println("Baño Social Luz apagada");
        break;
      //6
      case 'a':
        pinMode(puertaHab3, HIGH);
        Serial.println("Baño Social Luz encendida");
        break;
      case 's':
        pinMode(puertaHab3, LOW);
        Serial.println("Baño Social Luz apagada");
        break;
      //7
      case 'd':
        pinMode(ventanaHab1, HIGH);
        Serial.println("Baño Social Luz encendida");
        break;
      case 'f':
        pinMode(ventanaHab1, LOW);
        Serial.println("Baño Social Luz apagada");
        break;
      //8
      case 'g':
        pinMode(ventanaHab2, HIGH);
        Serial.println("Baño Social Luz encendida");
        break;
      case 'h':
        pinMode(ventanaHab2, LOW);
        Serial.println("Baño Social Luz apagada");
        break;
      //9
      case 'j':
        pinMode(ventanaHab3, HIGH);
        Serial.println("Baño Social Luz encendida");
        break;
      case 'k':
        pinMode(ventanaHab3, LOW);
        Serial.println("Baño Social Luz apagada");
        break;
      //10
      case 'l':
        pinMode(ventiladorHab1, HIGH);
        Serial.println("Baño Social Luz encendida");
        break;

      case 'z':
        pinMode(ventiladorHab1, LOW);
        Serial.println("Baño Social Luz apagada");
        break;
      case 'x':
        //11
        pinMode(ventiladorHab2, HIGH);
        Serial.println("Baño Social Luz encendida");
        break;
      case 'c':
        pinMode(ventiladorHab2, LOW);
        Serial.println("Baño Social Luz apagada");
        break;





    }




  }


}
