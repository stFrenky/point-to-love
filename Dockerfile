FROM node AS build

WORKDIR /app
ENV PROJECT_NAME=point-to-love

COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx:latest AS front


COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
