# Lojistik

A full-stack web-application for managing warehouse inventory.

## Folder structure

This application is in a Lerna monorepo and a yarn workspace.

| Package name | Description                   |
| ------------ | ----------------------------- |
| server       | Nest.js GraphQL API           |
| client       | CRA React Application         |

[Lerna Documentation](https://lerna.js.org/)

## Installation

There are 2 ways to run this application.

First, you need to clone this repository locally by running:

```git clone https://github.com/hainsdominic/lojistik.git```

### Using docker-compose and docker

In order to facilitate demonstration I dockerized the whole application. You need docker-compose and Docker installed on your machine.

[Docker installation instructions](https://docs.docker.com/get-docker/)
[docker-compose installation instructions](https://docs.docker.com/compose/install/)

After installing the prerequisites, run this command in the folder root:

```docker-compose up```

> Depending on your network speed, this command might take 1-5 minutes. The application will be fully started when docker stops outputting.

### Using Node.js, yarn and MongoDB

You need Node.js (v16 or higher), yarn and MongoDB installed on your machine. MongoDB needs to be running a process on port 27017.

After installing the prerequisites, run this command in the folder root to install the dependencies:

```yarn install```

The run the app:

```yarn dev```

## Usage

Once the application has been installed and is running, you can access the front-end by going to <http://localhost:3000> on your favorite browser.
