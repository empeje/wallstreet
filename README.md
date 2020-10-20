# wallstreet
[![Made in Indonesia](https://made-in-indonesia.github.io/made-in-indonesia.svg)](https://github.com/made-in-indonesia/made-in-indonesia)
[![Build Status](https://travis-ci.org/empeje/wallstreet.svg?branch=main)](https://travis-ci.org/empeje/wallstreet)

Wallstreet is a websocket app

![Screenshot of Ngecilin in action](./docs/login.png)

## Prerequisites for Development

1. Docker Installed (If not in Linux environment)
2. Node & NPM

## Setup Development Environment

1. Start the websocket server

```bash
# In Linux
yarn start:ws

# In non-Linux using Docker
yarn start:ws:docker
```

2. Yarn local setup

```bash
yarn start # this is the JS version

env RUNTIME=elm yarn start # this is the Elm version
```
