# productos-inserta

Proyecto simple de ejemplo que implementa un CRUD de productos con
autenticación, control de stock y endpoints REST usando Node.js, Express
y MongoDB.

## Características

- Usuarios, admin y customers.
- Productos, getAll y create.
- Autenticación con JWT y login local.
- Gestión de pedidos que decrementa stock de los productos automáticamente.

## Consideraciones

- El propio modelo ya crea un atributo createdAt y updatedAt así que no ví necesario crear order_date ya que habría información redundate
- Se opto por los pre hooks para hashear las contraseña antes de guardar los usuarios
- Los usuarios ADMIN_ROLE solo los pueden crear otros usuarios ADMIN_ROLE si no el usuario se creare directamente como CUSTOMER_ROLE
- La busqueda de productos tiene los filtros de stock y price

## Requisitos

- Git
- Docker

## Instalación

1. Clonar el repositorio

```bash
git clone https://github.com/Bouzas1402/productos-inserta.git
```

2. Ir a la raiz del proyecto y levantar los contenedores de docker

```bash
docker compose up --build
```

3. La base de datos comienza con un usuario admin que depende de las variables `ADMIN_EMAIL` y `ADMIN_PASSWORD`

## Variables de entorno (ejemplos)

- `NODE_ENV` - variable para saber en que modo se levanta el proyecto
- `PORT` - puerto de la aplicación
- `MONGO_URI` - URI de MongoDB
- `JWT_SECRET`, `JWT_EXPIRE`, `JWT_ISSUER`, `JWT_AUDIENCE` - variables para json web token
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` - variables para crear el primer usuario admin de la base de datos
- `BCRYPT_SALT_ROUNDS` - salt para la encriptacion de la contraseña
- `CORS_ORIGIN` - rutas admitidas por cors

Ejemplo de archivo `.env` con todas las variables usadas por el proyecto:

```env
# Node
NODE_ENV=development
PORT=3001

# Cadena de conexión para la aplicación
MONGO_URI=mongodb://mongo:27017/appdb?replicaSet=my-replica-set

# Unit user admin
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=admin123

# Cors
CORS_ORIGIN=http://localhost:3000,https://miapp.com

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
JWT_ISSUER=MiEmpresa.API
JWT_AUDIENCE=miapp.com

# Bcrypt
BCRYPT_SALT_ROUNDS=12
```

## Uso / Endpoints

La API expone rutas para autenticación, creacion de usuarios, productos y orders. Consultar
el código en `src/routes` para detalles de cada endpoint.

## Colección Postman

- Archivo en el repo (ruta relativa):

  [productos-inserta.postman_collection.json](productos-inserta.postman_collection.json)

- Enlace directo en GitHub para descarga automatizada:

  https://raw.githubusercontent.com/Bouzas1402/productos-inserta/main/productos-inserta.postman_collection.json

- Hay un script que hace que rellene la variable token
