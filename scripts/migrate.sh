#!/bin/sh

echo "Run mode is: $RUN_MODE"

echo "Running prisma generate"
npx prisma generate

if [ "$RUN_MODE" = "reset" ]; then
  echo "Running prisma migrate reset"
  npx prisma migrate reset --force
  npx prisma migrate dev --name init
elif [ "$RUN_MODE" = "deploy" ]; then
  echo "Running prisma migrate deploy"
  npx prisma migrate deploy --name init
else
  echo "Unknown mode: $RUN_MODE"
  exec "$@"
fi
