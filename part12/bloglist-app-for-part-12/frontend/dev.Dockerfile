FROM node:20.11.0

WORKDIR /usr/src/app

COPY . .

# Add this to reduce npm install output
ENV NPM_CONFIG_LOGLEVEL warn
ENV HOST=0.0.0.0
ENV PORT=5173

RUN npm install

CMD ["npm", "run", "dev"]