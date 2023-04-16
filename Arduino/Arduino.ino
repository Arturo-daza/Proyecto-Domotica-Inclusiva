// Declara el número del pin donde está conectado el LED
int luzHabPrincipal = 1;
int luzHab2 = 2;
int luzHab3 = 3;
int luzBanoSocial = 4;
int luzBanoHabitacion=5;
int luzcocina = 6;
int luzsala = 7;
int luzZonaLavado = 8;
int PuertaHabPrincipal = 9;
int PuertaHab2 = 10;
int PuertaHab3 = 11;
int PuertaBanoSocial = 12;
int PuertaBanoHabitacion=13;
char option;


void setup() {
  // Configura el pin como salida
  pinMode(luzHabPrincipal, OUTPUT);
  pinMode(luzHab2, OUTPUT);
  pinMode(luzHab3, OUTPUT);
  pinMode(luzBanoSocial, OUTPUT);
  pinMode(luzcocina, OUTPUT);
  pinMode(luzsala, OUTPUT);
  pinMode(luzZonaLavado, OUTPUT);
  pinMode(PuertaHabPrincipal, OUTPUT);
  pinMode(PuertaHab2, OUTPUT);
  pinMode(PuertaHab3, OUTPUT);
  pinMode(PuertaBanoSocial, OUTPUT);
  pinMode(PuertaBanoHabitacion, OUTPUT);
  Serial.begin(9600);
}

void loop() {
 
   if(Serial.available()>0){
    option=Serial.read();

     switch (option) {
  case 'a':
   pinMode(luzBanoSocial, HIGH);
    Serial.println("Baño Social Luz encendida");  
    break;
  case 'b':
   pinMode(luzBanoSocial, HIGH);
    Serial.println("Baño Social Luz apagada");  
      break;
  case 'c':
    // Acción para el valor3
    break;
  default:
    // Acción para cuando no se cumple ningún caso
    break;
    }
    if(option=='p')
    {
        digitalWrite(luzHabPrincipal, HIGH);
        digitalWrite(luzHab2, LOW);
    }
      if(option=='m')
    {
        digitalWrite(luzHab2, LOW);
        digitalWrite(luzHabPrincipal, HIGH);
    }

  }

}
