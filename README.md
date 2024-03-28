# Service Demo

> Description Here

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]
[![MIT License][license-shield]][license-url]

[Service Diagram & Rules](./RULES.md)

<!-- GETTING STARTED -->

## Installing / Getting started

You must be a member and added ssh key of workspace on bitbucket/gitlab. Clone the repo

```sh
```
git clone git@bitbucket.org:service/

## Development setup

### Built With

- "@nestjs/core": "^9.2.1"
- "@elastic/elasticsearch": "~8.6.0"
- ...

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- NodeJS v16.x to up
- NestJS v9
- Redis v5.x to up
- MongoDB v4.4 to up
- Elasticsearch v7.x to up

### Setting up

Follow all step bellow to setup your dev environment

1. Setup as `Installing / Getting started`

2. Start your environment (We are using Docker for environment setup)

3. Setup environment variables.
   Create environment config file and config `elasticsearch` and `redis` connection params

   Generate secret token: `head -n 4096 /dev/urandom | openssl sha1`
   Paste the result into JWT_SECRET in .env file

   ```sh
   cp .env.example .env

   # For docker production environment
   cp .env.production .env
   ```

4. Install NPM packages

   ```sh
   yarn install
   ```

5. Run development:

   ```sh
   # Run API metric service
   yarn dev

   # Run script cronjob demo
   yarn schedule
   ```

   You can start via docker compose

   ```sh
   docker-compose up -d

   docker-compose ps
   ```

6. Health check:

- Server is listening on: http://[::1]:9008/api/v1
- Server health: http://[::1]:9008/api/v1/demo/health
- Documentation: http://[::1]:9008/swagger

### Building

Test your code before build.

```shell
$ yarn test:coverage
```

Run build command to start service via PM2

```shell
$ sh build.sh
```

### Deploying / Publishing

Push your code to your branch with format `[__YOUR_USERNAME__]/[__FEATURE__]`

```shell
$ git add .
$ git commit -m "__COMMIT_MESSAGE__"
$ git push origin [__YOUR_USERNAME__]/[__FEATURE__]
```

Then go to repository server and make a pull request to branch `development`.

**IMPORTANT**: Don't push anything to `master` by yourself. A CI tool will run all step and merge to `master` for you.

## Production setup

- Install dependencies in production

```sh
yarn install --production=true
```

## Configuration

On `.env`, you must config all environment variables bellow. By default, `.env.example` is used default config for all service.

```
PORT = 9008
PREFIX = api/v1/
JWT_SECRET = 123123

SERVER_CORS_ENABLED=true
SERVER_REQUEST_WHITE_LIST=

```

## Tests

The test library is [Jest](https://github.com/facebook/jest).

- All test files must be located on `__tests__` and naming by format `[name].spec.js`

- The folders/files on `__tests__` must be as same as on `src` folder.

Just test

```sh
 yarn test
```

Test a file

```sh
 yarn test path/to/test/file
```

Test with coverage information

```sh
 yarn test:coverage
```

## Versioning

- [Current] `stable`: All code is on `master`

- v1.0.0: Init Project

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Licensing

Dev Team – [@DEV](dev@service) – dev@service

Private License.

All Rights Reserved

- Unauthorized copying of this file, via any medium is strictly prohibited
- Proprietary and confidential

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=flat-square
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
