FROM node:20
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV REDIS_URL=redis://redis-test:6379
ENV MONGO_URL=mongodb://the_username:the_password@mongo-test:27017/the_database

EXPOSE 39000

CMD ["npm", "run", "dev"]