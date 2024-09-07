# Backend de la Agenda Telefónica

Este proyecto es el backend para una aplicación de agenda telefónica. Está construido con Node.js y Express.

## Despliegue en Producción

El backend está desplegado en [Render](https://fullstackopen-part3-wafm.onrender.com).

Puedes acceder a la API en la siguiente URL:  
[https://fullstackopen-part3-wafm.onrender.com/api/persons/](https://fullstackopen-part3-wafm.onrender.com/api/persons/)

Si también estás sirviendo el frontend desde el mismo backend, puedes acceder a la aplicación completa en:  
[https://fullstackopen-part3-wafm.onrender.com](https://fullstackopen-part3-wafm.onrender.com)

## Pruebas de la API

Puedes probar las rutas de la API usando Postman o cualquier otro cliente HTTP. Asegúrate de probar las siguientes rutas:

- `GET /api/persons`: Obtener todos los contactos.
- `POST /api/persons`: Crear un nuevo contacto.
- `DELETE /api/persons/:id`: Eliminar un contacto.

## Instalación Local

Para correr el backend localmente, sigue estos pasos:

1. Clona el repositorio.
2. Instala las dependencias con:

   ```bash
   npm install
   ```

3. (Opcional) Crea un archivo `.env` para tus variables de entorno si necesitas configurar alguna variable personalizada.
4. Ejecuta la aplicación en modo desarrollo con:

   ```bash
   npm run dev
   ```

   O en producción con:

   ```bash
   npm start
   ```