FROM node:20.11.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG MONGODB_URI
ARG SECRET
ARG PORT

ENV MONGODB_URI=${MONGODB_URI}
ENV SECRET=${SECRET}
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD [ "npm", "start" ]
