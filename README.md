
# Introducción a NoSQL, MongoDB y Redis

## 1. ¿Qué es una base de datos NoSQL y en qué se diferencia (conceptualmente) de una base SQL?

Una base de datos NoSQL es un sistema de almacenamiento que no utiliza el modelo tradicional basado en tablas y relaciones.
Está orientado a la escalabilidad horizontal, alta disponibilidad y manejo de datos semiestructurados.

Diferencias clave:

1. Modelo de datos  
   - SQL: tablas, filas y columnas.  
   - NoSQL: documentos, pares clave–valor, grafos, etc.

2. Esquema  
   - SQL: esquema rígido, basado en estructuras definidas previamente.  
   - NoSQL: esquema flexible, documentos con estructura variable.

---

## 2. Rol de MongoDB en el ecosistema NoSQL

MongoDB es una base de datos NoSQL orientada a documentos.
Almacena datos en formato JSON/BSON, permitiendo estructuras flexibles, anidadas y heterogéneas.

Motivos por los que es adecuada para JSON/BSON:
- Representa objetos de forma natural.  
- Almacena estructuras complejas sin fragmentarlas en múltiples tablas.  
- Facilita integración con aplicaciones web y APIs.  
- Permite modificar la estructura sin migraciones extensas.

---

## 3. Conceptos básicos de MongoDB

| Concepto     | Analogía SQL | Descripción                               |
|--------------|--------------|-------------------------------------------|
| Base de datos | Base de datos | Agrupa colecciones                         |
| Colección     | Tabla         | Agrupa documentos                          |
| Documento     | Fila          | Objeto JSON con claves y valores          |

Ejemplo de documento JSON:

```json
{
  "name": "Mario",
  "role": "admin",
  "skills": ["python", "mongodb"],
  "active": true
}
```

---

## 4. Ventajas del esquema flexible de MongoDB

Ventajas:
1. Permite cambios rápidos en el modelo sin grandes migraciones.  
2. Facilita el almacenamiento de datos heterogéneos o anidados.

Riesgo:
- Puede generar inconsistencias entre documentos si no se define un control de esquema o validación.

---

## 5. ¿Qué es Redis y por qué es un "data structure server"?

Redis es un motor en memoria que maneja estructuras de datos complejas, no solo pares clave–valor simples.
Por esta razón se le conoce como servidor de estructuras de datos.

Soporta, entre otros:
- Strings  
- Hashes  
- Lists  
- Sets  
- Sorted Sets  

---

## 6. Tipos de datos en Redis: uso, comandos y casos

### 6.1 Lists

Comandos básicos:
- `LPUSH key value`  
- `RPUSH key value`  
- `LPOP key`  
- `LRANGE key start end`

Caso de uso:
- Implementación de colas simples (FIFO) para procesamiento de tareas.

---

### 6.2 Sorted Sets

Comandos básicos:
- `ZADD key score member`  
- `ZRANGE key start end WITHSCORES`  
- `ZREM key member`

Caso de uso:
- Rankings dinámicos de usuarios o elementos según puntajes.

---

## 7. Laboratorio de turnos (MongoDB + Redis)

Información almacenada en MongoDB:
- Datos persistentes: usuarios, turnos, historial.

Información manejada o acelerada con Redis:
- Datos volátiles como:
  - turnos en cola  
  - contadores  
  - tiempos de espera  

Lógica:
- MongoDB almacena datos duraderos.  
- Redis optimiza operaciones frecuentes y de acceso rápido.

---

## 8. Laboratorio de Tamagochi (MongoDB + Redis)

Estado persistente almacenado en MongoDB:
- Información del personaje:
  - nombre  
  - fecha de creación  
  - atributos base  
  - propiedades desbloqueadas  

Estado dinámico administrado por Redis:
- Variables con cambios frecuentes:
  - hambre  
  - energía  
  - felicidad  
  - timers o cooldowns  

Justificación:
- MongoDB conserva identidad y progreso.  
- Redis gestiona valores temporales de alta frecuencia.

---

## 9. Diseño propio con MongoDB + Redis

Criterio general de partición:

MongoDB:
- Datos persistentes, jerárquicos y de largo plazo.

Redis:
- Datos transitorios, frecuentemente actualizados o que requieren baja latencia.

Ejemplo en MongoDB:

```json
{
  "userId": "u01",
  "name": "Sara",
  "preferences": {
    "theme": "dark"
  }
}
```

Ejemplo en Redis:

```
session:u01 = token, timestamp
```

---

## 10. Reflexión final

Uso preferente de MongoDB:
- Aplicaciones con datos complejos o documentos.
- Entornos donde el modelo evoluciona frecuentemente.
- Ejemplos: perfiles de usuario, atributos del tamagochi.

Uso preferente de Redis:
- Cachear datos.
- Manejo de sesiones.
- Colas de trabajo.
- Contadores o rankings en tiempo real.

Ejemplos vistos:
- Contadores de estado del tamagochi.
- Colas de turnos para mejorar tiempos de respuesta.

---

Fin del documento.
