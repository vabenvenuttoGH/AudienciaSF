# Backend - Gestión de Audiencias

API REST para gestionar audiencias del Poder Judicial de Santa Fe.

## Stack Tecnológico
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

## Estructura

```
backend/
├── src/
│   ├── config/          # Configuración (DB, variables)
│   ├── controllers/     # Lógica de negocio
│   ├── models/          # Esquemas de Mongoose
│   ├── routes/          # Definición de rutas
│   └── server.js        # Servidor principal
├── package.json
├── .env.example
└── .gitignore
```

## Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
   - Copiar `.env.example` a `.env`
   - Llenar `MONGODB_URI` con tu conexión a MongoDB

3. **Iniciar servidor:**
```bash
npm run dev    # Modo desarrollo (con nodemon)
npm start      # Modo producción
```

El servidor estará en `http://localhost:5000`

## API Endpoints

### Audiencias

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/audiencias` | Crear audiencia |
| GET | `/api/audiencias` | Obtener todas |
| GET | `/api/audiencias/:id` | Obtener una |
| PUT | `/api/audiencias/:id` | Actualizar |
| DELETE | `/api/audiencias/:id` | Eliminar |

### Ejemplo de crear una audiencia

```bash
curl -X POST http://localhost:5000/api/audiencias \
  -H "Content-Type: application/json" \
  -d '{
    "fecha": "2025-12-15T09:00:00",
    "hora": "09:00",
    "causa": "Exp 204/25 - Daños",
    "expediente": "204/25",
    "sala": "Sala 1",
    "demandante": "Juan Pérez",
    "demandado": "María González",
    "juez": "Dr. López",
    "estado": "Programada"
  }'
```

## Variables de Entorno

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## Desarrollo

- `npm run dev` - Inicia servidor con auto-reload (nodemon)
- Cambios en archivos se aplican automáticamente
