### BUILDER ###
FROM alexsuch/angular-cli:6.1.2 as builder

COPY . /usr/src/
WORKDIR /usr/src
RUN npm install
RUN ng build --prod

### FINAL IMAGE ###
FROM nginx:alpine

EXPOSE 80

COPY --from=builder /usr/src/dist/sse-client/ /var/www/
COPY nginx.conf /etc/nginx/nginx.conf
