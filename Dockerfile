FROM node:8.14.0-alpine

WORKDIR /baglava

COPY package.json .
RUN npm install --quiet

COPY src src

CMD npm run contentserver
