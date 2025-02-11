FROM node:20.11.0
WORKDIR /usr/src/app

COPY . .

ENV NPM_CONFIG_LOGLEVEL warn

RUN npm install

CMD ["npm", "run", "dev"]