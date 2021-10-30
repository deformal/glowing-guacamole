FROM node:16

RUN mkdir app

WORKDIR /app

COPY package.json ./

COPY ./ ./

RUN yarn 

RUN yarn build

EXPOSE 80:5000

CMD ["yarn", "start"]
