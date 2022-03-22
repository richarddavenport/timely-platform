FROM node:alpine

WORKDIR /app

COPY package.json .
RUN npm install

ENV NODE_ENV=production PORT=8080 GRAPHQL_ENDPOINT=
EXPOSE $PORT

COPY . .
RUN npm run build

CMD ["npm", "run", "start"]
