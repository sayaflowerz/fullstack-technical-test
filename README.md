# OrderNow - Sistema de Gestión de Pedidos

Aplicación fullstack para gestionar pedidos con Angular y .NET

## Tecnologías

**Frontend:**
- Angular 21
- Tailwind CSS 
- Leaflet (mapas) OPEN STREETMAPS
- SweetAlert2

**Backend:**
- .NET 10
- Entity Framework Core
- SQL Server LocalDB
- Swagger

## Requisitos previos

- Node.js (v18+)
- .NET 10 SDK
- SQL Server LocalDB (viene con Visual Studio)

## Cómo correr la aplicación

### 1. Clonar el repositorio

```bash
git clone https://github.com/sayaflowerz/fullstack-technical-test.git
cd fullstack-technical-test
```

### 2. Configurar la base de datos

La app usa SQL Server LocalDB. La conexión ya está configurada en `backend/backend/appsettings.json`:

```json
"ConnectionStrings": {
  "PubContext": "Server=(localdb)\\MSSQLLocalDB;Database=OrderDB;Integrated Security=true;TrustServerCertificate=True"
}
```

**Base de datos:** `OrderDB`

**Tabla:** `CustomerOrders`

| Columna | Tipo | Descripción |
|---------|------|-------------|
| OrderId | int | Primary Key |
| CustomerName | string | Nombre del cliente |
| CustomerId | string | ID del cliente |
| Product | string | Producto |
| Quantity | int | Cantidad |
| DeliveryDate | DateTime | Fecha de entrega |
| DeliveryAddress | string | Dirección de entrega |
| PaymentMethod | string | Método de pago |
| ContactPhone | long | Teléfono de contacto |

Crear la base de datos (desde la carpeta backend/backend):

```bash
cd backend/backend
dotnet ef database update
```

Si no tienes ef instalado:
```bash
dotnet tool install --global dotnet-ef

Install-Package xunit
```
PARA PRUEBAS XUNIT

### 3. Correr el Backend

```bash
cd backend/backend
dotnet run --launch-profile http
```

El backend corre en: `http://localhost:5053`

Swagger disponible en: `http://localhost:5053/swagger`

Correr las pruebas: 
•	Ejecutar todos los tests del solution: dotnet test
•	Ejecutar sólo el proyecto de tests: dotnet test backend\backend.Tests
•	Ejecutar con salida detallada: dotnet test backend\backend.Tests -v minimal

### 4. Correr el Frontend

En otra terminal:

```bash
cd frontend
npm install
ng serve
```

El frontend corre en: `http://localhost:4200`

## Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/Orders | Obtener todos los pedidos |
| GET | /api/Orders/{id} | Obtener pedido por ID |
| POST | /api/Orders | Crear nuevo pedido |
| PUT | /api/Orders/{id} | Actualizar pedido |
| DELETE | /api/Orders/{id} | Eliminar pedido |

## Funcionalidades

- Crear, editar y eliminar pedidos
- Búsqueda de pedidos por cliente
- Mapa interactivo para buscar direcciones (Leaflet + OpenStreetMap)
- Alertas de confirmación personalizadas (SweetAlert2)

## Estructura del proyecto

```
fullstack-technical-test/
├── backend/
│   └── backend/
│       ├── Controllers/
│       ├── Models/
│       ├── Data/
│       └── Program.cs
├── frontend/
│   └── src/
│       └── app/
│           ├── components/
│           │   ├── form/
│           │   ├── list/
│           │   └── home/
│           └── services/
└── README.md
```

## Autora

Daniela Florez Villamil

---

Desarrollado con Angular y .NET
