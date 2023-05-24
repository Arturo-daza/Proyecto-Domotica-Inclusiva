from conexionBD import *  #Importando conexion BD

#Creando una funcion para obtener la lista de carros.
def listaconfiguraciones():
    conexion_MySQLdb = connectionBD() #creando mi instancia a la conexion de BD
    cur      = conexion_MySQLdb.cursor(dictionary=True)
    querySQL = "SELECT * FROM Configuraciones"
    cur.execute(querySQL) 
    resultadoBusqueda = cur.fetchall() #fetchall () Obtener todos los registros
    cur.close() #Cerrando conexion SQL
    conexion_MySQLdb.close() #cerrando conexion de la BD    
    return resultadoBusqueda

def listaLugares():
    conexion_MySQLdb = connectionBD() #creando mi instancia a la conexion de BD
    cur      = conexion_MySQLdb.cursor(dictionary=True)
    querySQL = "SELECT * FROM Lugares"
    cur.execute(querySQL) 
    resultadoBusqueda = cur.fetchall() #fetchall () Obtener todos los registros
    cur.close() #Cerrando conexion SQL
    conexion_MySQLdb.close() #cerrando conexion de la BD    
    return resultadoBusqueda

def actualizarConfiguraciones(manejo, interaccionPuertas, interaccionVentanas, interaccionLuces, deteccionObjetos, nombreUsuario):
    conexion_MySQLdb = connectionBD()
    cur = conexion_MySQLdb.cursor(dictionary=True)
    cur.execute("""
            UPDATE Configuraciones
            SET
                manejo = %s, 
                interaccionPuertas   = %s,
                interaccionVentanas  = %s,
                interaccionLuces    = %s,
                deteccionObjetos   = %s,
                nombreUsuario = %s
            WHERE id=1
            """, (manejo, interaccionPuertas, interaccionVentanas, interaccionLuces, deteccionObjetos, nombreUsuario))
    conexion_MySQLdb.commit()
    cur.close()  # cerrando conexion de la consulta sql
    conexion_MySQLdb.close()  # cerrando conexion de la BD
    resultado_update = cur.rowcount  # retorna 1 o 0
    return resultado_update

def actualizarLugares(habitacion1,habitacion2, habitacion3,bañoPrivado, bañoSocial, salaComedor, lavado, cocina ):
    conexion_MySQLdb = connectionBD()
    cur = conexion_MySQLdb.cursor(dictionary=True)
    cur.execute("""
            UPDATE Lugares
            SET
                habitacion1   = %s,
                habitacion2  = %s,
                habitacion3    = %s,
                bañoPrivado   = %s,
                bañoSocial = %s,
                salaComedor = %s,
                lavado = %s,
                cocina = %s
            WHERE id=1
            """, (habitacion1,habitacion2, habitacion3,bañoPrivado, bañoSocial, salaComedor, lavado, cocina))
    conexion_MySQLdb.commit()
    cur.close()  # cerrando conexion de la consulta sql
    conexion_MySQLdb.close()  # cerrando conexion de la BD
    resultado_update = cur.rowcount  # retorna 1 o 0
    return resultado_update