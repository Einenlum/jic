# jic

Ridiculously simple Dependency Injection Container for NodeJS.

## Why a DIC?

To improve general code quality thanks to inversion of control, and to avoid using things like [proxyquire](https://www.npmjs.com/package/proxyquire) in your tests.

## Why jic?

This is a **very simple** DIC you can use for small projects, if you don't need much more advanced tools like [electrolyte](https://github.com/jaredhanson/electrolyte), [awilix](https://github.com/jeffijoe/awilix), or [inversifyJS](http://inversify.io/).

No Typescript, no automatic loading. Just a tiny tool to help you build your composition root.

## Requirements

Node version >= 8.

## Install

`npm add --save @einenlum/jic` or `yarn add @einenlum/jic`

## Usage

To register services and dependencies: `container.register(arrayOfServices, rootDirectory);`

To get a service: `container.get(idOfTheService);`

Example:

```js
const container = require('@einenlum/jic');

container.register([
  {id: 'request', path: 'request'},
  {id: 'curryWurst': path: './curryWurst', dependencies: ['sausage', 'ketchup', 'curry']},
  {id: 'ketchup', path: './ketchup'},
  {id: 'curry', path: './curry', dependencies: ['request']},
  {id: 'sausage', path: './sausage'}
], __dirname) // the path that will be used as root for the internal services

// To fetch the service you want (will always return a singleton):
container.get('curryWurst');
container.get('request');
```

All internal services must be written as functions with
dependencies as parameters.

Examples:

```js
// ./curryWurst.js
const curryWurst = function(sausage, ketchup, curry) {
  return {
    // ...
  };
};

module.exports = curryWurst;
```

```js
// ./ketchup.js
const ketchup = function() {
  return {
    // ...
  };
};

module.exports = ketchup;
```

## License

MIT License.
