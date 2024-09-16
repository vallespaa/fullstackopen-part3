# Backend de la Agenda Telefónica

Este proyecto es el backend para una aplicación de agenda telefónica. Está construido con Node.js, Express y MongoDB, y maneja las validaciones de los datos a nivel de servidor.

## Despliegue en Producción

El backend está desplegado en [Render](https://fullstackopen-part3-wafm.onrender.com).

Puedes acceder a la API en la siguiente URL:  
[https://fullstackopen-part3-wafm.onrender.com/api/persons/](https://fullstackopen-part3-wafm.onrender.com/api/persons/)

Si también estás sirviendo el frontend desde el mismo backend, puedes acceder a la aplicación completa en:  
[https://fullstackopen-part3-wafm.onrender.com](https://fullstackopen-part3-wafm.onrender.com)

## Rutas de la API

### GET `/api/persons`

Obtiene todos los contactos almacenados en la base de datos.

### GET `/api/persons/:id`

Obtiene un contacto específico según el ID. Si el ID es incorrecto o no existe, se devolverá un error de validación.

### POST `/api/persons`

Crea un nuevo contacto en la agenda. El cuerpo de la solicitud debe tener el siguiente formato:

```json
{
  "name": "John Doe",
  "number": "040-123456"
}
```

Si el nombre o el número no cumplen con las validaciones (por ejemplo, longitud mínima o formato incorrecto), el servidor devolverá un mensaje de error indicando el problema.

### PUT `/api/persons/:id`

Actualiza el número o nombre de un contacto existente. El cuerpo de la solicitud debe incluir el nuevo número o nombre:

```json
{
  "name": "John Doe",
  "number": "040-654321"
}
```

Este endpoint también realiza validaciones al actualizar un contacto. Si el formato del número o el nombre es incorrecto, se devolverá un error de validación.

### DELETE `/api/persons/:id`

Elimina un contacto por su ID.

## Validaciones

El backend realiza validaciones a nivel de esquema utilizando Mongoose. Algunas validaciones importantes son:

- **Nombre**: Debe tener al menos 3 caracteres.
- **Número de teléfono**: Debe tener un formato específico (como `xx-xxxxxx` o similar).

Si una validación falla, se devolverá un error con un mensaje claro explicando el problema. Por ejemplo:

```json
{
  "error": "Name must be at least 3 characters long"
}
```

## Manejo de Errores

El backend está preparado para manejar distintos tipos de errores:

- **ID malformado**:
  ```json
  {
    "error": "malformatted id"
  }
  ```
  
- **Errores de validación**:
  ```json
  {
    "error": "Phone number format is invalid"
  }
  ```

Estos errores se manejan en el middleware de manejo de errores y se envían al cliente para que el frontend pueda mostrar el mensaje correspondiente.

## Instalación Local

Para correr el backend localmente, sigue estos pasos:

1. Clona el repositorio.
2. Instala las dependencias con:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto para definir las siguientes variables de entorno:

   ```bash
   MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/phonebook
   PORT=3001
   ```

4. Ejecuta la aplicación en modo desarrollo con:

   ```bash
   npm run dev
   ```

   O en producción con:

   ```bash
   npm start
   ```

## Pruebas de la API

Puedes probar las rutas de la API usando Postman o cualquier otro cliente HTTP. Asegúrate de probar las siguientes rutas:

- `GET /api/persons`: Obtener todos los contactos.
- `POST /api/persons`: Crear un nuevo contacto.
- `PUT /api/persons/:id`: Actualizar el número de un contacto.
- `DELETE /api/persons/:id`: Eliminar un contacto.

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB
- Mongoose
- Axios (en el frontend)
- Render (para despliegue en producción)