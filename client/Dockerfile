FROM node:16.16.0

WORKDIR /app

COPY package*.json /app

RUN npm install

RUN npm audit fix --force

COPY . .

EXPOSE 3000

CMD ["npm", "start"]