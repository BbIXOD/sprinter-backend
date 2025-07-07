#!/bin/sh

sleep 1 
npx prisma generate
npm run start:dev
