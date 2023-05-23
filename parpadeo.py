import cv2
import mediapipe as mp
import math
import time
from utils import enviar_mensaje
from controllerBD import listaLugares


def controlador_parpadeo(controlador, ubicacionesPuerta, ubicacionesVentana, ubicacionesLuz):
    lugaresPlano = listaLugares()

    while controlador:
        mp_face_mesh = mp.solutions.face_mesh
        mp_drawing = mp.solutions.drawing_utils

        cap = cv2.VideoCapture(0)

        parpadeo = False
        conteo = 0
        tiempo_inicial = time.time()
        objeto = ""
        lugar = ""
        mensaje = ""

        with mp_face_mesh.FaceMesh(
                static_image_mode=False,
                max_num_faces=1,
                min_detection_confidence=0.5) as face_mesh:
            while True:
                ret, frame = cap.read()
                if ret == False:
                    break
                frame = cv2.flip(frame, 1)
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                results = face_mesh.process(frame_rgb)

                px = []
                py = []
                lista = []
                r = 5
                t = 3

                if results.multi_face_landmarks is not None:
                    for face_landmarks in results.multi_face_landmarks:
                        for id, puntos in enumerate(face_landmarks.landmark):
                            al, an, c = frame.shape
                            x, y = int(puntos.x * an), int(puntos.y * al)
                            px.append(x)
                            py.append(y)
                            lista.append([id, x, y])

                            if len(lista) == 468:
                                x1, y1 = lista[145][1:]
                                x2, y2 = lista[159][1:]
                                cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
                                longitud1 = math.hypot(x2 - x1, y2 - y1)

                                x3, y3 = lista[374][1:]
                                x4, y4 = lista[386][1:]
                                cx2, cy2 = (x3 + x4) // 2, (y3 + y4) // 2
                                longitud2 = math.hypot(x4 - x3, y4 - y3)

                                cv2.putText(frame, f'Parpadeos: {int(conteo)}', (0, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)
                                cv2.putText(frame, f'tiempo: {int(time.time() - tiempo_inicial)}', (60, 120), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)
                                cv2.putText(frame, f'lugar: {lugar}', (60, 180), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 3)
                                
                                if longitud1 <= 10 and longitud2 <= 10 and parpadeo == False:
                                    conteo = conteo + 1
                                    parpadeo = True
                                    inicio = time.time()

                                elif longitud2 > 10 and longitud2 > 10 and parpadeo == True:
                                    parpadeo = False
                                    final = time.time()

                                if time.time() - tiempo_inicial > 4:
                                    tiempo_inicial = time.time()
                                    if lugar == "":
                                        if conteo == 3:
                                            lugar = lugaresPlano[0]['habitacion1'].lower()
                                        elif conteo == 4:
                                            lugar = lugaresPlano[0]['habitacion2'].lower()
                                        elif conteo == 5:
                                            lugar = lugaresPlano[0]['habitacion3'].lower()
                                        elif conteo == 6:
                                            lugar = lugaresPlano[0]['bañoSocial'].lower()
                                        elif conteo == 7:
                                            lugar = lugaresPlano[0]['bañoPrivado'].lower()
                                        elif conteo == 8:
                                            lugar = lugaresPlano[0]['salaComedor'].lower()
                                        elif conteo == 9:
                                            lugar = lugaresPlano[0]['lavado'].lower()
                                        elif conteo == 10:
                                            lugar = lugaresPlano[0]['cocina'].lower()
                                        conteo=0
                                    else: 
                                        if conteo == 3:
                                            objeto = 'Puerta'
                                        elif conteo == 4:
                                            objeto = 'Ventana'
                                        elif conteo == 5:
                                            objeto = 'Luz'
                                        else:
                                            mensaje = "No se indentifico el mensaje"
                                    
                                        if objeto =="Puerta":
                                            if ubicacionesPuerta[lugar]:
                                                    ubicacionesPuerta[lugar] = not ubicacionesPuerta[lugar]
                                                    mensaje = "Cerrando puerta " + lugar
                                            else:
                                                ubicacionesPuerta[lugar] = not ubicacionesPuerta[lugar]
                                                mensaje = "Abriendo puerta " + lugar
                                        elif objeto == "Ventana":
                                            if ubicacionesVentana[lugar]:
                                                    ubicacionesVentana[lugar] = not ubicacionesVentana[lugar]
                                                    mensaje = "Cerrando ventana " + lugar
                                            else:
                                                ubicacionesVentana[lugar] = not ubicacionesVentana[lugar]
                                                mensaje = "Abriendo ventana " + lugar
                                        elif objeto == "Luz":
                                            if ubicacionesLuz[lugar]:
                                                    ubicacionesLuz[lugar] = not ubicacionesLuz[lugar]
                                                    mensaje = "Apagando luz " + lugar
                                            else:
                                                ubicacionesLuz[lugar] = not ubicacionesLuz[lugar]
                                                mensaje = "Encendiendo luz " + lugar
                                        print(ubicacionesLuz)
                                        enviar_mensaje(ubicacionesLuz, ubicacionesPuerta, ubicacionesVentana, mensaje)
                                        conteo = 0
                                        objeto = ""
                                        lugar = ""

                frame = cv2.imencode('.jpg', frame)[1].tobytes()
                yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    cap.release()
