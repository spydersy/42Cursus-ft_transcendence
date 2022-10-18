
FROM node:18.8

WORKDIR /front-end

COPY package*.json .

RUN yarn install

CMD ["yarn", "start"]

