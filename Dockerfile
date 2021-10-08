# stage 1
#  FROM node:16 as node-image

#  RUN mkdir -p /app

#  WORKDIR /app

#  COPY package.json /app
 
#  COPY . /app
 
#  RUN npm install
 
#  RUN npm run build

#  RUN npm run dist


# stage 2

# FROM node:16 as app-image

# WORKDIR /usr/src/app

# COPY --from=node-image /app/dist ./dist

# COPY --from=node-image /app/node_modules ./node_modules

# COPY --from=node-image /app/starter.sh ./

# COPY --from=node-image /app/ecosystem.config.js ./

# EXPOSE 3000
 
# CMD ["./dist/starter.sh"]

FROM node:16

RUN mkdir app

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npm i pm2 -g

RUN npm audit fix --force

COPY ./ ./

RUN npm run build

RUN npm run dist 

RUN sleep 3

RUN rm -rf build src package.json package-lock.json tsconfig.json 

EXPOSE 3000

CMD ["pm2-runtime", "./ecosystem.config.js"]
