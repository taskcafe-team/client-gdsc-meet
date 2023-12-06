FROM node:18-alpine

RUN mkdir -p /app/node_modules

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

# Rename 'prepare' to '_prepare'
RUN sed -i 's/"prepare":/"_prepare":/g' package.json
# Run yarn install
RUN yarn install --network-timeout 3000000
# Rename '_prepare' back to 'prepare'
RUN sed -i 's/"_prepare":/"prepare":/g' package.json

COPY . ./

EXPOSE 3000

CMD yarn build && yarn preview
