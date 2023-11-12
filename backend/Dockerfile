FROM node:21-alpine3.17

COPY api /app/api
COPY model /app/model
COPY routes /app/routes
COPY .env constants.ts db_connection.ts index.ts util.ts package.json tsconfig.json /app/

WORKDIR /app/
RUN npm install
RUN npm run build

CMD [ "npm", "start" ]