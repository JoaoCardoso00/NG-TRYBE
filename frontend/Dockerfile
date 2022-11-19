FROM node:16 AS Production

WORKDIR /usr/src/frontend

RUN yarn global add typescript

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]