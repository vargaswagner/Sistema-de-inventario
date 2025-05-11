## 📁 Sistema de Inventario

:construction: Proyecto en construcción :construction:

Bienvenido al **Sistema de Inventario**. Este proyecto gestiona el inventario de productos, el registro de usuarios, autenticación, la gestión de stock y otras funcionalidades clave. A continuación se describen los pasos para ejecutar y configurar el sistema.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- **Node.js** (versión recomendada: v14.x o superior)
- **PostgreSQL** (o cualquier otra base de datos compatible)
- **npm** o **yarn** (dependiendo del gestor de dependencias que prefieras)

## Pasos para ejecutar el proyecto

### 📁 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone git@github.com:vargaswagner/Sistema-de-inventario.git
```

### 🛠️ 2. Instalar las dependencias

Una vez clonado el repositorio, navega a la carpeta del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

### 🛠️ 3. Configurar la base de datos

El sistema usa PostgreSQL como base de datos, por lo que es necesario configurar el archivo `.env` para establecer las credenciales y detalles de conexión.

1. Crear el archivo `.env` en la raíz del proyecto con la siguiente información:

```bash
PORT=3030

DB_HOST=
DB_NAME=
DB_PORT=
DB_USER=
DB_PASS=
```

2. Asegúrate de que tu servidor de base de datos esté funcionando y que las credenciales sean correctas. Si utilizas otro sistema de bases de datos, necesitarás ajustar la configuración acorde.

### 🛠️ 4. Generar claves SECRET para JWT

El sistema utiliza JSON Web Tokens (JWT) para la autenticación. Necesitarás generar claves secretas para firmar los tokens.

Para crear las claves secretas, ejecuta el siguiente comando:

```bash
npm run generakey
```

Este comando generará las claves `ACCESS_TOKEN_SECRET` y `REFRESH_TOKEN_SECRET` y las agregará automáticamente al archivo .env si no existen.

### 🛠️ 5. Ejecutar el servidor

Una vez que las dependencias estén instaladas y el archivo .env configurado correctamente, puedes iniciar el servidor con el siguiente comando:

```bash
npm start
```

l servidor se ejecutará en el puerto 3030 de manera predeterminada. Puedes acceder a la API desde tu navegador o usar herramientas como Postman para probar los endpoints.

### 6. Probar la API

Abre el siguiente enlace en tu navegador para probar la API:

[http://localhost:3030](http://localhost:3030),

Si prefieres una interfaz más amigable para realizar pruebas, te sugerimos usar Postman, donde podrás probar las diferentes rutas de la API.
