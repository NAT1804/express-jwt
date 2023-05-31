FROM node:14

WORKDIR /express-jwt-app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
