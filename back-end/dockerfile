FROM node:18.8

# EXPOSE 3001/tcp

WORKDIR /back-end


COPY package*.json .


# COPY . .

RUN npm install


CMD ["sh", "/back-end/init_back.sh"]