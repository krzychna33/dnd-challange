# DnD challenge API

### Running locally with docker

1. Run `npm install`
2. `cp .env.example .env`
3. `docker-compose up`
4. enjoy

### Running unit tests

1. `npm i`
2. `npm run test`

### Running e2e tests

1. `npm i`
2. `docker-compose -f docker-compose.test.yml up`
3. `npm run test:e2e`


Swagger docs are available at `http://localhost:3000/api` after running the app.
