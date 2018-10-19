FROM node:10.12.0-alpine

RUN mkdir -p /app
WORKDIR /app

RUN apk update  \
    && apk upgrade \
    && apk add bash

COPY . .
RUN yarn install --production

CMD ["yarn", "start"]
