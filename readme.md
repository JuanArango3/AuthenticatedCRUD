# AuthenticatedCRUD

Esta es una API para manejar información de películas, donde se puede crear, listar y filtrar películas por año de lanzamiento o precio.

## Requisitos

- Node.js
- npm
- MongoDB (debe estar corriendo en local o configurado mediante la variable de entorno `MONGODB_URI`)

## Configuración del entorno

Antes de ejecutar el proyecto, asegúrate de configurar el archivo `.env` con las variables de entorno necesarias. Se ha proporcionado un archivo de ejemplo llamado `.env.example`.

### Pasos para configurar el archivo de entorno:

1. Copia el archivo `.env.example` y renómbralo como `.env`:
   ```bash
   cp .env.example .env
   ```
2. Abre el archivo `.env` y ajusta las variables según sea necesario.
3. Instala las dependencias
    ```bash
    npm install
    ```
## Ejecución del proyecto
### En desarrollo
Para ejecutar el proyecto en modo desarrollo utilizando nodemon (que reinicia automáticamente el servidor en caso de cambios en el código):
```bash
npm start
```
### En producción
Para construir el proyecto y ejecutarlo en modo producción:
1. Construye el proyecto:
   ```bash
   npm run build
    ```
2. Ejecuta:
   ```bash
   node dist/index.js
    ```