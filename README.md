# Project Name
PepperJack BTetsy Carousel Server Design Capstone

> Project description
The goal of this project is to build out a server capable of hosting the carousel for traffic at large volume

## Related Projects

  - https://github.com/SDC-PepperJack/Pepperjack-carousel-darjama (this repo)
  - https://github.com/SDC-PepperJack/Pepperjack-checkout-service
  - https://github.com/SDC-PepperJack/pepperjack-item-details
  - https://github.com/SDC-PepperJack/Pepperjack-reviews-service

## Table of Contents

1. [Usage](#Usage)
1. [Seeding](#seeding)
1. [Requirements](#requirements)
1. [Development](#development)


## Usage

> Some usage instructions

RESTful API routes are provided for all CRUD operations.

GET requests to retrieve all products use url /products

GET requests for a single product use the url /products/:productId

POST requests use the url /products with JSON data for the fields productId, productItem, pictureUrl, and like in the body

PUT requests use the url /products/:productId with JSON data for the like field in the body

DELETE requests for a single product use the url /products/:productId

## Seeding

1. From the server/seed directory, run the following command:
```
psql -f pgCarouselSchema.sql -p port -U username betsycarousel
```
2. To create the CSV files, run:
```
npm run seed
```
3. To import the CSV files, run:
```
npm run seed:import
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

