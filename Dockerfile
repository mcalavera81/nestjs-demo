FROM node:14 as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install 
# --only=development
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN yarn build

FROM node:14 as production

RUN apt-get update -y
RUN apt-get install dumb-init -y
WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production
COPY . .

COPY --from=development /usr/src/app/dist ./dist

ENV SERVER_PORT 8000
EXPOSE ${SERVER_PORT}

ENTRYPOINT ["dumb-init", "yarn", "start:prod"]
