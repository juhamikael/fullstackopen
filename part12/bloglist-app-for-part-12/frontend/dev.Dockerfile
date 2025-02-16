FROM node:latest

WORKDIR /usr/src/app

COPY . .

ENV NPM_CONFIG_LOGLEVEL warn
ENV HOST=0.0.0.0
ENV PORT=5173

RUN npm install

CMD ["npm", "run", "dev"]