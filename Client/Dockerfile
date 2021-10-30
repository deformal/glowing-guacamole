FROM node:16-alpine3.14

RUN mkdir app

WORKDIR /app

COPY package.json ./

COPY ./ ./

RUN npm i 

RUN npm run build

EXPOSE 5000:5000

CMD ["npm", "start"]

# FROM nginx
# EXPOSE 5000
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/dist /usr/share/nginx/html
 
