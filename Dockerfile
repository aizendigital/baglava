FROM node:8.14.0-alpine

WORKDIR /baglava

COPY package.json .
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install --quiet
RUN npm rebuild bcrypt --build-from-source
COPY src src

CMD npm run contentserver
