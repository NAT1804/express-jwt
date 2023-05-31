FROM node:14

WORKDIR /express-jwt
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD [ "npm", "start" ]
