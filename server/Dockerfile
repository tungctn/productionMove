FROM node:16
WORKDIR /app
COPY ./package.json ./package.json
COPY ./index.js ./index.js
RUN yarn install 
EXPOSE 8001
CMD ["yarn", "start"]