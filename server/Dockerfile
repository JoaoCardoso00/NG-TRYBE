FROM node:16 AS Production

ENV ACCESS_TOKEN_SECRET=secretpassword
ENV REFRESH_TOKEN_SECRET=secretpassword

WORKDIR /usr/src/server

RUN yarn global add typescript

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install 

COPY . .

EXPOSE 3333/udp
EXPOSE 3333/tcp

CMD ["yarn", "start"]