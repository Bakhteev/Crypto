FROM node:18.15 as build
#RUN npm install -g typescript vite
WORKDIR /app
COPY package.json /app/package.json
RUN npm i
COPY . /app
RUN npm run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]