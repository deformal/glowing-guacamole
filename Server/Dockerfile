FROM node:16-alpine3.14

RUN mkdir app

WORKDIR /app

COPY package.json ./

COPY ./ ./

RUN yarn 

RUN yarn global add pm2 

RUN yarn build

RUN yarn dist

RUN yarn clean

EXPOSE 9000:9000

CMD ["pm2-runtime", "./ecosystem.config.js"]
