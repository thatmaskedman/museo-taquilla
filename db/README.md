# Módulo de Base de Datos

Módulo para mantenimiento y consultas a la base de datos del proyecto.

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