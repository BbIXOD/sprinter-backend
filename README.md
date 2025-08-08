# Sprinter Backend

## About Sprinter

Sprinter is an app for AGILE and SCRUM similar to Jira.

## Description

This part of Sprinter app is a backend.
It provides API for interacting with database and authentication.

## Tech stack

- NestJS
  - Typescript
  - Class \Validator
  - Class Transformer
  - JWT, Passport, Argon2
- Prisma ORM
- Docker
  - Docker Compose
- Insomnia

## Features

- Authentication
- CRUD access to next entities:
  - Board
  - Sprint
  - Status
  - Task
  - Membership (role based access)
- Containerization with watch (basically hot reload)

## Usage

First you need to set up your .env file.
Also note that you need to provide your own database
if running outside docker.

### Env structure

```bash
DATABASE_URL=postgresql://postgres:postgres@db:5432/postgres # database url to connect
RUN_MODE=reset # reset to clear database, deploy to run migrations (in progress). Required only in docker
JWT_SECRET=secret # secret for jwt
JWT_EXPIRES_IN=24h # how long jwt is valid
ADMIN_NAME=admin # name of default user
ADMIN_EMAIL=admin@admin.com # email of default user
ADMIN_PASSWORD=admin # password of default user
HOST=0.0.0.0 # host to listen on, can be empty
PORT=3000 # port to listen on, can be empty
```

### Running via docker compose

You just need docker compose installed and run: `docker compose up --build`

### Running without docker

You will need npm installed and run:

  ```bash
  npm install
  npx prisma generate
  npx prisma migrate dev --name init
  npm run start:dev
  ```

## Demo

Here you can find [hosted demo](https://sprinter-backend.onrender.com)
_since project is in development it is not 100% stable_

## API test with Insomnia

Here you can find [insomnia collection](insomnia-requests.yaml)
