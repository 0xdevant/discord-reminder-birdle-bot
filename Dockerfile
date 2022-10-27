FROM node:16.18.0-alpine
WORKDIR /usr/src

COPY package.json yarn.lock ./
COPY index.ts ./

# yarn install dependencies
RUN yarn

CMD ["npx", "ts-node", "./index.ts"]