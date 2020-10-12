# node:latest contains vulnerabilities. Don't use it.
FROM node:alpine3.11

RUN mkdir -p /usr/app/app/

WORKDIR /usr/app/

COPY package.json /usr/app/
COPY server.js /usr/app/

RUN npm install --only=prod --silent

COPY app/ /usr/app/app/

RUN chown -R node:node /usr/app

USER node:node

EXPOSE 3000

ENV configFile=msDevServers

ENTRYPOINT ["node", "server.js"]
