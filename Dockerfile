FROM node:16

RUN mkdir app

WORKDIR /app

COPY package.json ./

RUN yarn 

COPY ./ ./

RUN ./prod.sh

EXPOSE 9000:9000

CMD ["pm2-runtime", "./ecosystem.config.js"]
