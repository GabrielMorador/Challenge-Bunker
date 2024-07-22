# Challenge [Backend] - Software Enginee
This project contains a possible solution for the challenge.



## install dependencies
npm install

## Run test
Tests are run using the typical command:

npm test

## Project Setup

This application is designed to run in a Docker container. Make sure you have Docker installed.

## Build and start the Docker container:
docker-compose up --build -d

## Features
CRUD Operations: Create, Read, Update, Delete campaigns - read and create interactions.
Database: Efficient data management using Prisma ORM with postgres.
Containerization: Easy setup and deployment using Docker.
Validation: Input validation and error handling.

## Usage
After setting up the project, you can start the development server and access the API at http://localhost:3000/api.

## API Endpoints

## Campaigns
GET /campaigns: Retrieve a list of all campaigns. -> default list all of them or with parameter active=true filter only active
POST /campaigns: Create a new campaign.
GET /campaigns/:id  Retrieve a specific campaign by ID.
PUT /campaigns/:id Update a campaign by ID.
DELETE /campaigns/:id Delete a campaign by ID.

## Interactions
GET /interactions: Retrieve a list of all interactions.
POST /interactions: Create a new interaction.


## Events

Within the events directory, the application is structured to handle events using two main subdirectories: emitters and handlers. The interactionEmitter.ts file in emitters is responsible for emitting events related to interactions. In handlers, the interactionHandler.ts file handles the logic associated with interaction events. Additionally, rabbitMQConnection.ts provides the configuration and management of the connection with RabbitMQ, which is the messaging system used for event transmission. This structure allows for organized and efficient event handling within the application.

## Environment Variables
The project uses the following environment variables:

DATABASE_URL: The URL of the postgres database.
POSTGRES_USER= user name  
POSTGRES_PASSWORD= user password  
POSTGRES_DB= name db   
PORT= port app  