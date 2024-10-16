# Products - microservice

## Instalación

```bash
npm install
```

## Ejecutar la app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migraciones

```sh
# Instalar el Cliente de Prisma
npm install @prisma/client

# Configura e inicializa Prisma en el proyecto
npx prisma init

# Ejecutar las migraciones y crear la base de datos
npx prisma migrate dev

# Generar una nueva migración
npx prisma migrate dev --name MigrationName
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 🐳 Docker

```sh
# Crear el contenedor de NATS
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```

```sh
# Crear la imagen de producción
docker build -f Dockerfile.prod -t products-ms .
```
