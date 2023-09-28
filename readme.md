# Servicios Lambda

Funciones de prueba para desplegar en AWS Lambda

## Environment Variables

Para poder correr el proceso, necesitaras las siguientes variables de entorno en el archivo .env, como serverless.yml.

`privateKey`

`REDIS_URL`

`URL`

## Installation

Instala los paquetes con npm

```bash
  npm install
```

## Running Tests

Para ejecutar las pruebas, corre el siguiente comando y tomar en cuenta que el proyecto tiene que estar ejecutandose en modo desarrollo.

```bash
  npm run test
```

## Deployment

Para desplegar el proyecto en AWS ejecutar:

```bash
  serverless deploy -s prod
```

## Run Locally

Clona el repositorio

```bash
  git clone https://link-to-project
```

Ve al directorio del proyecto

```bash
  cd my-project
```

Instala las dependencias

```bash
  npm install
```

Ejecuta el servidor en modo desarrollo

```bash
  npm run dev
```
