FROM node:16

RUN mkdir app

WORKDIR /app

COPY package.json ./

COPY ./ ./

RUN yarn 

RUN ./prod.sh

RUN yarn clean

EXPOSE 9000:9000

CMD ["pm2-runtime", "./ecosystem.config.js"]
