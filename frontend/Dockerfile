FROM node:10.12.0 as builder

ARG REACT_APP_SURL_API_HTTP_URL
ARG REACT_APP_SURL_API_WS_URL

RUN mkdir -p /builder
WORKDIR /builder

COPY . .
RUN yarn install \
    && yarn build

#######

FROM nginx:1.12.2-alpine

RUN mkdir -p /app

COPY nginx.conf /etc/nginx
COPY mime.types /etc/nginx

COPY --from=builder /builder/build /app

EXPOSE 80

CMD nginx -g 'daemon off;'
