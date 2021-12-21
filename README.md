# API de Taquilla (Museo S8A)

Backend de la entidad "Taquilla", parte del ecosistema para un Museo de la clase de Desarrollo y Diseño de Sistemas Complejos (grupo S8A).

# Instalación

## 1. Definir variables de entorno

### 1.1 Crear archivo de variables de entorno

- Windows

   ```copy .env.example .env```

- Linux/MacOS

    ```cp .env.example .env```

### 1.2 Cambiar los valores en el archivo .env de acuerdo al entorno


## 2. Instalar dependencias

```npm ci```

## 3.A Para desarrollo

### 3.A.1 Instalar `nodemon`
Nodemon es un servidor de desarrollo que reacciona a las modificaciones de los archivos en tiempo real.

```npm i -g nodemon```

### 3.A.2 Correr el servidor de `nodemon`.

```nodemon .```

## 3.B Para producción

### 3.B.1 Correr el servidor de `node`.

`node .`

