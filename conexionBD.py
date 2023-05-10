#Importando Libreria mysql.connector para conectar Python con MySQL
import mysql.connector

def connectionBD():
    mydb = mysql.connector.connect(
        host ="containers-us-west-4.railway.app",
        user ="root",
        passwd ="QxGdhn8lnt26chWB0Ynx",
        database = "railway",
        port= "6675"
        )
    ## ddd755506
    # mydb = mysql.connector.connect(
    #     host ="containers-us-west-139.railway.app",
    #     user ="root",
    #     passwd ="kD2d9tiATpwebGAfD12h",
    #     database = "railway",
    #     port= "6346"
    #     )
    # mydb = mysql.connector.connect(
    #     host ="containers-us-west-25.railway.app",
    #     user ="root",
    #     passwd ="XpGRY3oTQeEJXpNsyhrk",
    #     database = "railway",
    #     port= "5821"
    #     )
    if mydb:
        return mydb
    else:
        print("Error en la conexion a BD")
    
connectionBD()
    
    