# API-Talento-digital

API - TALENTO DIGITAL

1.- INSTALACION DE DEPENDENCIAS
Para poder crear la API se necesita instalar node. js y las siguientes dependencias:
-axios
-cors
-dotenv
-express

2.-CREAR BASE DE DATOS

Al ser creada en PostgreSQL, se necesita instalar el complemento "POSTGIS" para que pueda leer e ingresar correctamenre las coordenadas a la base de datos.
Para eso se debe instalar "POSTGIS" desde el Aplication Stack Builder, que se iniciar al instalar PostgreSQL (también puede instalarse al momento de instalar PostgreSQL)

![imagen instalacion](https://github.com/EduardoArratia/API-Talento-digital/blob/master/CapturasPantalla/IPostgis.jpg)

Luego se debe crear la base de datos, que se llama por defecto "final"

Una vez creada la BD se debe conectar POSTGIS con la base de datos que ya creamos, ingresando la informacion requerida.

![imagen coneccion BD y POSTGIS](https://github.com/EduardoArratia/API-Talento-digital/blob/master/CapturasPantalla/CPDB.jpg)


Una vez hecho esto, se instala el complemento de PSOTGIS a través de la query tool de el siguiente modo

![QUERY TOOL](https://github.com/EduardoArratia/API-Talento-digital/blob/master/CapturasPantalla/QTL1.png)

Se abrirá una ventana donde se debe ingresar "CREATE EXTENSION postgis;" , se ejecuta y estará listo

![CREATE EXTENSION](https://github.com/EduardoArratia/API-Talento-digital/blob/master/CapturasPantalla/QTL2.png)


Habiendo hecho esto, se podrán crear la tabalas en la base de datos.

Este proceso fue llevado a cabo a través de este tutorial: https://www.youtube.com/watch?v=tTUM9XfDvqk

Es importante recordar que la API esta siendo utilizada en localhost:4000 
Se debe utilizar la API para podes desplegar los puntos que se vayan ingresando a ella.
Se dejan en el archivo "estructura_base_datos.txt algunos valores para las tablas
Además se debe considerar que la información de la BD debe ser ingresada a través del archivo .env

DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_DATABASE=


Dejo además la relacion de mi base de datos:
![Base de datos](https://github.com/EduardoArratia/API-Talento-digital/blob/master/CapturasPantalla/relacion%20usuarios.jpg)



RUBRICA DESPLEGADA:


1.-Consultas base de datos
-Selección de columnas requeridas para presentar la información solicitada:
En API: index.js lineas 40,47,55,81,108.
-Uso de JOIN para relacionar la información de distintas tablas:
En API: index.js lineas 86
-Uso de WHERE para filtrar la información requerida:
En API: index.js lineas 87
-Uso de cláusulas de ordenamiento para presentar la información:
En API: index.js lineas 40,47,55,81,108.
-Uso de cláusulas de agrupación de información para obtener datos agregados:
En API: index.js lineas 40.


2.-Algoritmo de cálculo y manipulación de archivos de texto
Ver repositorio aplicación:

3.-Página web y html
Ver repositorio aplicación: 

4.-Lenguaje Node
-Inclusión de paquetes y librerías de usuario
En API: al inicio del index.js  
-Agrupación del código y separación por funcionalidad
En API: En el index.js (su totalidad)  
-Utilización de funciones asíncronas
En API: En el index.js en 40, 47,55,81,108. 

Lectura de parámetros de entrada
En APP WEB
Funcionamiento general del aplicativo
En APP WEB

5.-Conexión a base de datos
Manejo de conexión a base de datos desde Node
En API: En el index.js entre las líneas 14 y 19
Manejo y ejecución de consultas desde Node
En API: En el index.js en general

6.-Uso de Express
Creación servicio Rest con Express
En API: En el index.js en general
