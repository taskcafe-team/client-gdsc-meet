FROM node:18-alpine

RUN mkdir -p /app/node_modules

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN yarn install

COPY . ./

EXPOSE 3000

CMD yarn build && yarn preview
