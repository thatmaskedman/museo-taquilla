# API de Taquilla (Museo S8A)

Backend de la entidad "Taquilla", parte del ecosistema para un Museo de la clase de Desarrollo y Diseño de Sistemas Complejos (grupo S8A).

# Instalación

## 1. Crear la Base de Datos

Este proyecto está hecho para trabajar con MySQL/MariaDB. En caso de usar MariaDB, utilizar el comando equivalente para MariaDB de la instrucción de a continuación.

### 1.1 Crear una base de datos para este proyecto.

La codificación recomendada para el proyecto es `utf8mb4` con colación `utf8mb4_general_ci`.

```mysql -u [user] -p"[password]" -e "CREATE DATABASE [schema] CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"```

Reemplazar `user` y `password` por las credenciales de MySQL y `schema` por la base de datos reservada para este proyecto.


## 2. Definir variables de entorno

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

### 5.A.1 Instalar `nodemon`
Nodemon es un servidor de desarrollo que reacciona a las modificaciones de los archivos en tiempo real.

```npm i -g nodemon```

### 5.A.2 Correr el servidor de `nodemon`.

```nodemon .```

## 5.B Para producción

### 5.B.1 Correr el servidor de `node`.

```node .```

