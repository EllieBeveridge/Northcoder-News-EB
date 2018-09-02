## Northcoder News

## Prerequisites

Fork and clone the project into the desired directory with the following command format:
````
git clone https://github.com/EllieBeveridge/BE2-northcoders-news

cd BE2-northcoders-news
````

Install Node and MongoDB using this installation guide https://github.com/northcoders/setup-guides/blob/master/Linux/README.md

Now type the following into your command line:

````
npm install
````

To start running your Mongo database type:

````
mongod
````

into your command line.

You will need to install a express before running this app in your browser.
Write the following into your command line:

````
npm install express
````

To seed the database, we need mongoose. Install by writing the following into your command line:

````
npm install mongoose
````

Ensure you have

## Getting Started

To seed the database, write the following into your command line:

````
npm run seed:production

npm run dev
`````

The seeded data will now be available in localhost:9090. To test whether the development environment is running, input one of the GET endpoints.

A list of the end points can be found here:

> https://elbevs-northcoder-news.herokuapp.com/api

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

## Authors

Ellie Beveridge - Initial Work - Ellie Beveridge

## Acknowledgements

Everyone who works at Northcoders who answered my repeated calls on nchelp! And of course to my helpful fellow cohort members.