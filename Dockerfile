FROM node:16-alpine

RUN mkdir -p /app/node_modules

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY yarn.lock ./

# rebuild node-sass
RUN yarn add node-sass

COPY . ./

RUN yarn install

EXPOSE 3000

# start app
CMD yarn build && yarn preview
