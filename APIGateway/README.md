# Servicio APIGateway

API de la entidad "Taquilla", parte del ecosistema para un Museo de la clase de Desarrollo y Diseño de Sistemas Complejos (grupo S8A).

Este servicio reune todos los recursos en el backend de Taquilla y pretende ser la única interfaz con la que el frontend y otros sistemas externos se comunican.

# Instalación


## 1. Montar la base de datos

Seguir todas las instrucciones referentes a la base de datos del directorio raíz.


## 2. Definir variables de entorno

### 2.1 Crear archivo de variables de entorno

- Windows

   ```copy .env.example .env```

- Linux/MacOS

    ```cp .env.example .env```

### 2.2 Cambiar los valores en el archivo .env de acuerdo al entorno


## 3. Instalar dependencias

```npm ci```


## 4.A Para desarrollo

### 4.A.1 Correr el servidor de `nodemon`

Nodemon es un servidor de desarrollo que reacciona a las modificaciones de los archivos en tiempo real. Aunque es recomendable tenerlo instalado de forma global, está presente como dependencia de desarrollo en este proyecto.

```nodemon .```

## 4.B Para producción

### 4.B.1 Correr el servidor de `node`

```node .```