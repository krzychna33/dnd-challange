# DnD challenge API

### Running locally with docker

1. Run `npm install`
2. `cp .env.example .env`
3. `docker-compose up`
4. enjoy

Swagger docs are available at `http://localhost:3000/api` after running the app.

Data from `briv.json` are loaded into the database on startup. Use `Briv` as `{name}` when using REST API.

### Running unit tests

1. `npm i`
2. `npm run test`

### Running e2e tests

1. `npm i`
2. `cp .env.test.example .env.test`
3. `docker-compose -f docker-compose.test.yml up`
4. `npm run test:e2e`

You should have node v20 to run the tests/app without docker.

## About solution

Solution isn't obviously production ready API, but it fulfills the requirements of the task.
There are some things that could be improved, like error handling, logging, validation, etc.
I've used Clean Architecture with DDD approach (I've used only some necessary elements) to structure the code.
Thanks to that, the code is easy to test and maintain and open for future extensions.
Dependencies go inwards and the most of business logic is inside Character aggregate. 

I covered Character aggregate with unit tests as this is place where business invariants are kept.
I also prepared simple e2e tests to cover happy paths of the API.

