FROM node:20.11.1-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN cat package.json
RUN ls /app
RUN npm install

ADD . .

EXPOSE 3000

CMD ["npm", "run", "start"]