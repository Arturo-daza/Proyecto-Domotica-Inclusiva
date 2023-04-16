// Declara el número del pin donde está conectado el LED
int ledPin = 13;
int ledPin1 = 12;
int option;

void setup() {
  // Configura el pin como salida
  pinMode(ledPin, OUTPUT);
  pinMode(ledPin1, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if(Serial.available()>0){
    option=Serial.read();
    if(option=='p')
    {
        digitalWrite(ledPin, HIGH);
        digitalWrite(ledPin1, LOW);
    }
      if(option=='m')
    {
        digitalWrite(ledPin, LOW);
        digitalWrite(ledPin1, HIGH);
    }

  }

}
