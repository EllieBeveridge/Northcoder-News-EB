## Northcoder News

## Prerequisites

Fork and clone the project into the desired directory with the following command format:
````
git clone https://github.com/EllieBeveridge/BE2-northcoders-news

cd BE2-northcoders-news
````

Download and install Node by following the instructions found on their website [here](https://nodejs.org/en/download/)

Download and install MongoDB using the instructions found on their website [here](https://docs.mongodb.com/manual/installation/https://github.com/northcoders/setup-guides/blob/master/Linux/README.md)

To make sure express, mongoose and nodemon are running, please type the following code into your command line terminal:

````
npm install
````

To start running your Mongo database type the following into your command line terminal:

````
mongod
````

## Getting Started

The config file needs to be setup. In the same directory as the app.js file, please create a new file called config.js. Then populate with code in the following format:

````
const ENV = process.env.NODE_ENV || 'development';

const config = {
  development: {
    DB_URL: 'mongo_URL',
    PORT: 9090
  },
  test: {
    DB_URL: 'mongo_URL'
  },
  production: {
    DB_URL: 'prod_URL
  }
}

module.exports = config[ENV];
````

The string 'mongo_URL' will be replaced with the URL of your default mongo database port, which is 27017.

The string 'prod_URL' should be a link to the mlabs database, which includes a username and password. Make sure to NEVER modify the gitignore, as this will stop your config file from being shared publicly on Github.

To seed the database, write the following into your command line:

````
npm run seed:dev

`````

The seeded data will now be available in localhost:9090. To test whether the development environment is running, run the server with the following code:

````
npm run dev
`````

Now input one of the GET endpoints onto the end of the localhost:9090 address.

A list of the end points can be found [here](https://elbevs-northcoder-news.herokuapp.com/api)


To exit nodemon, use Ctrl + C

## Running the Tests

To run a test for all end points, simply type into the command line:

````
npm test
````

## Built with

Node - JavaScript Runtime

npm - Package Manager for JavaScript

Mongoose - Object Modelling for Node.js

Express - Web Framework for Node.js

Nodemon - Node.js Development Tool

## Authors

Ellie Beveridge - Initial Work - Ellie Beveridge

## Acknowledgements

Everyone who works at Northcoders who answered my repeated calls on nchelp! And of course to my helpful fellow cohort members.