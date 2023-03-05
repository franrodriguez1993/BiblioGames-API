# English Docs:

## Bibliogames - API

### Introduction:

This is a REST API built with Node.js, MongoDB, Typescript, and GraphQL. It allows users to retrieve information about videogames, including their titles, release dates, genres,platforms, trailers, and cover images. The API also includes an image uploader module made with ImageKit, which enables users to upload, retrieve, and delete images associated with each videogame.

### Requirements:

- Node.js v12 or higher
- MongoDB v4 or higher
- Typescript
- Nodemon
- ImageKit account with API credentials

### Installation

1. Clone this repository
2. Run npm install to install dependencies
3. Create a .env file and add the following variables:

PORT: the port number on which the server will run
MODE: "production" or "development"
MONGO_URI: the URI of your MongoDB database
IK_PUBLIC_KEY: your ImageKit public key
IK_PRIVATE_KEY: your ImageKit private key
IK_URL_ENDPOINT: your ImageKit endpoint URL

4. Run npm run dev to start the development server

# Spanish Docs:

## Bibliogames - API

### Introducción:

Este es un REST API construido con Node.js, MongoDB, Typescript y GraphQL. Permite a los usuarios obtener información sobre videojuegos, incluyendo sus títulos, fechas de lanzamiento, géneros, plataformas, trailers e imágenes de portada. La API también incluye un módulo de carga de imágenes hecho con ImageKit, lo que permite a los usuarios subir, recuperar y eliminar imágenes asociadas con cada videojuego.

### Requisitos:

- Node.js v12 o superior
- MongoDB v4 o superior
- Typescript
- Nodemon
- Cuenta ImageKit con credenciales API

### Instalación:

1. Clonar este repositorio
2. Ejecutar npm install para instalar las dependencias
3. Crear un archivo .env y agregar las siguientes variables:

PORT: el número de puerto en el que se ejecutará el servidor
MODE: "producción" o "desarrollo"
MONGO_URI: la URI de su base de datos MongoDB
IK_PUBLIC_KEY: su clave pública de ImageKit
IK_PRIVATE_KEY: su clave privada de ImageKit
IK_URL_ENDPOINT: la URL de su punto final de ImageKit

4. Ejecutar npm run dev para iniciar el servidor de desarrollo
