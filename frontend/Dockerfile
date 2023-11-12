FROM node:21-alpine3.17

COPY package.json /app/
COPY tsconfig.json /app/
COPY public /app/public
COPY src /app/src

WORKDIR /app

RUN npm install

CMD [ "npm", "start" ]