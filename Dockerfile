FROM node:16.7-alpine as deps

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm ci --only=production

FROM deps as build

WORKDIR /usr/src/app

RUN npm set progress=false && npm config set depth 0 && npm install --ignore-scripts

COPY . ./

RUN npm run build

FROM node:16.7-alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

RUN apk add dumb-init


USER node

COPY --chown=node:node --from=deps /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist

CMD [ "dumb-init", "node", "dist/main.js" ]
