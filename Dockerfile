FROM node:21-alpine as builder
WORKDIR /usr/src/app
COPY . ./
RUN npm ci --quiet --unsafe-perm
RUN npm run build -- --prod --output-path=build

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY deploy/prod/nginx/cors-settings.conf /etc/nginx/includes/cors-settings.conf
COPY deploy/prod/nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]