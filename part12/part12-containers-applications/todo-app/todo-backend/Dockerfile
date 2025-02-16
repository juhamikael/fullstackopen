FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV REDIS_URL=redis://redis-prod:6379
ENV MONGO_URL=mongodb://the_username:the_password@mongo-prod:27017/the_database

EXPOSE 3000

CMD [ "npm", "start" ]
