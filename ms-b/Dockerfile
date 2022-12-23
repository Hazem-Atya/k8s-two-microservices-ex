FROM node:lts-alpine
WORKDIR /app

COPY package* .

RUN npm install

COPY . .

CMD ["npm", "start"]  