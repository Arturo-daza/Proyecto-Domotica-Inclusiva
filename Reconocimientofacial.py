import speech_recognition as sr

r = sr.Recognizer()

with sr.Microphone() as source:
    print("Di algo...")
    audio = r.listen(source)

try:
    texto = r.recognize_google(audio, language='es-ES')
    print("Has dicho: " + texto)
except sr.UnknownValueError:
    print("No se ha podido entender lo que has dicho")
except sr.RequestError as e:
    print("Error al solicitar el reconocimiento de voz; {0}".format(e))