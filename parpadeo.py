import cv2
import mediapipe as mp
import math
import time


def controlador_parpadeo(controlador):
    while controlador:
        mp_face_mesh = mp.solutions.face_mesh
        mp_drawing = mp.solutions.drawing_utils

        # Se realiza la videocaptura
        cap = cv2.VideoCapture(0)

        # Variables de conteo
        parpadeo = False
        conteo = 0

        # Variable de tiempo inicial
        tiempo_inicial = time.time()
        #Variables domotica
        puerta = False
        luz= False
        ventilador=False

        resultado = "iniciando"
        with mp_face_mesh.FaceMesh(
                static_image_mode=False,
                max_num_faces=1,  # rostros a detectar
                min_detection_confidence=0.5) as face_mesh:
            while True:
                ret, frame = cap.read()
                if ret == False:
                    break
                frame = cv2.flip(frame, 1)
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                results = face_mesh.process(frame_rgb)

                # Listas para almacenar los resultados
                px = []
                py = []
                lista = []
                r = 5
                t = 3

                if results.multi_face_landmarks is not None:
                    for face_landmarks in results.multi_face_landmarks:
                        # Se extraen los puntos del rostro detectado

                        for id, puntos in enumerate(face_landmarks.landmark):

                            # print(puntos) Proporción
                            al, an, c = frame.shape
                            x, y = int(puntos.x * an), int(puntos.y * al)
                            px.append(x)
                            py.append(y)
                            lista.append([id, x, y])

                            if len(lista) == 468:

                                # Ojo derecho
                                x1, y1 = lista[145][1:]
                                x2, y2 = lista[159][1:]
                                cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
                                longitud1 = math.hypot(x2 - x1, y2 - y1)


                                # Ojo izquierdo
                                x3, y3 = lista[374][1:]
                                x4, y4 = lista[386][1:]
                                cx2, cy2 = (x3 + x4) // 2, (y3 + y4) // 2
                                longitud2 = math.hypot(x4 - x3, y4 - y3)


                                # Detección de microsueño
                                cv2.putText(frame, f'Parpadeos: {int(conteo)}', (0, 60), cv2.FONT_HERSHEY_SIMPLEX, 1,
                                            (0, 255, 0), 3)
                                cv2.putText(frame, f'tiempo: {int(time.time() - tiempo_inicial)}', (60, 120), cv2.FONT_HERSHEY_SIMPLEX, 1,
                                            (0, 255, 0), 3)
                                cv2.putText(frame, f'tiempo: {resultado}', (250, 90),
                                            cv2.FONT_HERSHEY_SIMPLEX, 1,
                                            (0, 255, 0), 3)
                                if longitud1 <= 10 and longitud2 <= 10 and parpadeo == False:  # Parpadeo
                                    conteo = conteo + 1
                                    parpadeo = True
                                    inicio = time.time()

                                elif longitud2 > 10 and longitud2 > 10 and parpadeo == True:  # Seguridad parpadeo
                                    parpadeo = False
                                    final = time.time()

                                if time.time() - tiempo_inicial >= 3:
                                    tiempo_inicial = time.time()
                                    if conteo == 3 and luz:
                                        print("Apagar luz")
                                        resultado = "Apagar luz"
                                        luz = False
                                    elif conteo == 3 and luz == False:
                                        print("Prender luz")
                                        resultado = "Prender luz"
                                        luz= True
                                    if conteo == 4 and puerta:
                                        print("Cerrar puerta")
                                        resultado = "Cerrar puerta"
                                        puerta = False
                                    elif conteo == 4 and puerta == False:
                                        print("Abrir puerta")
                                        resultado = "Abrir puerta"
                                        puerta = True
                                    conteo = 0

                frame = cv2.imencode('.jpg', frame)[1].tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        cap.release()
