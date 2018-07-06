# Alpha Fitness REST API

[![Build Status](https://semaphoreci.com/api/v1/projects/6f873a38-8d89-4fa3-8396-00fac430b75f/2076448/badge.svg)](https://semaphoreci.com/alpha-fitness/alpha-api)

REST API backend for the Alpha Fitness clients

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Docker (Docker for Mac / Docker for Windows)
* Node.js 8+ (and NPM)

### Installing

Install host dependencies (for editor linting etc.)

```bash
$ npm install
```

Start development enviroment

```bash
$ docker-compose up
```

Hit localhost:80 to see it working

```bash
$ curl localhost:80
```


## Running the tests

Explain how to run the automated tests for this system

### Integration tests

To run the integration tests

```
$ docker-compose exec api npm test
```

### Linting

To run eslint to check code style

```
$ docker-compose exec api npm run lint -s
```

The -s option supresses the npm error if eslint exits with a non-zero exit code (due to code linting errors)

## Deployment

When a commit is pushed to master branch, Semaphore CI will run tests and lint. If successful a new tagged docker image will be built and pushed to Docker Hub.

## Built With

* [Docker](https://docs.docker.com/) - Containerization
* [Node](https://nodejs.org/en/about/) - JavaScript Runtime
* [Express](https://expressjs.com/) - Web Framework

## Versioning

[SemVer](http://semver.org/) is used for versioning. For the versions available, see the [tags on this repository](https://github.com/aidengaripoli/alpha-api/tags).

## Authors

* **Aiden Garipoli** - *Initial work* - [aidengaripoli](https://github.com/aidengaripoli)

## Acknowledgments

* Bret Fisher - [Node Docker Good Defaults](https://github.com/BretFisher/node-docker-good-defaults)
