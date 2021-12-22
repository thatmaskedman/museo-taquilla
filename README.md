# Backend de Taquilla (Museo S8A)

Backend de la entidad "Taquilla", parte del ecosistema para un Museo de la clase de Desarrollo y Diseño de Sistemas Complejos (grupo S8A).

# Instalación

## 1. Crear la Base de Datos

Este proyecto está hecho para trabajar con MySQL/MariaDB. En caso de usar MariaDB, utilizar el comando equivalente para MariaDB de la instrucción de a continuación.

### 1.1 Crear una base de datos para este proyecto.

La codificación recomendada para el proyecto es `utf8mb4` con colación `utf8mb4_general_ci`.

```mysql -u [user] -p"[password]" -e "CREATE DATABASE [schema] CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"```

Reemplazar `user` y `password` por las credenciales de MySQL y `schema` por la base de datos reservada para este proyecto.


## 2. Definir variables de entorno

Dentro de cada servicio (APIGateway, UsuariosRepositorio, db, etc.) hace falta crear el respectivo archivo de variables de entorno.

### 2.1 Crear archivo de variables de entorno

- Windows

   ```copy .env.example .env```

- Linux/MacOS

    ```cp .env.example .env```

### 2.2 Cambiar los valores en el archivo .env de acuerdo al entorno


## 3. Instalar dependencias

```npm ci```


## 4. Definir y poblar la Base de Datos

### 4.1 Correr el script de creación de tablas.

```npm run migrate```

### 4.2 Correr el script de poblado de tablas.

```npm run seed```


## 5.A Para desarrollo

### 5.A.1 Correr todos los servicios con `nodemon`

Nodemon es un servidor de desarrollo que reacciona a las modificaciones de los archivos en tiempo real. Aunque es recomendable tenerlo instalado de forma global, está presente como dependencia de desarrollo en este proyecto.

Este proyecto tiene un comando para inicializar el servidor de `nodemon` en todos los servicios que lo requieren desde una misma terminal con ayuda de la librería `shell-exec`:

```npm run watch```

Si hace falta ejecutar sólamente un servicio en particular, se siguen las instrucciones en el README correspondiente.


## 5.B Para producción

### 5.B.1 Correr todos los servicios con `node`.

Así como en el caso de desarrollo, este proyecto tiene un comando para inicializar el servidor de `node` en todos los servicios que lo requieren desde una misma terminal:

```npm run serve```

Si hace falta ejecutar sólamente un servicio en particular, se siguen las instrucciones en el README correspondiente.


# Inspiración

Esta implementación de Arquitectura Orientada a Servicios está basada en los siguientes repositorios y artículos (esta lista puede seguir creciendo):

1. https://github.com/ShankyTiwari/Microservices-in-Nodejs (SoA)
2. https://github.com/JanssenBrm/api-gateway (SoA)
3. https://github.com/zellwk/endpoint-testing-example (tests)
4. https://www.nginx.com/blog/building-microservices-using-an-api-gateway/ (SoA)
5. https://github.com/jeffbski/microservices (SoA)