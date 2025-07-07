FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY ./scripts/launch.sh /app/launch.sh
RUN chmod +x /app/launch.sh

COPY . .

EXPOSE 3000


ENTRYPOINT ["/app/launch.sh"]

