FROM node:18.8

WORKDIR /front-end


COPY package*.json .

# COPY . .



RUN npm install
RUN npm install @types/styled-components
RUN npm install @types/react-modal

CMD ["npm", "start"]
