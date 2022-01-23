# Introduction

The following document provides an comprehended source of knowledge about basics of solidity programming and tools used throughout the course.

# Mocha

Mocha is a test framework for Java Script code.

Installation: Use first command to be able to run test from command line, and second to add dependency to `package.json` file.
```sh
    npm install --global mocha
    npm install --save-dev mocha
```

Functions:
 * `it` - runs a test and makes an assertion
 * `describe` - groups together `it` functions
 * `beforeEach` - executes some general setup code.

Example:
```js
    describe('Car', () => {
        it('can park', () => {
            const car = new Car();
            assert.equal(car.park(), 'stopped');
        });
    });
```
It can be easily noticed that both functions used take two arguments. The first argument is printable name, that is logged in the console after test execution. The second argument in lambda function that contains test's logic.

Example:
```js
    let car;
    beforeEach(() => {
        car = new Car();
    });

    describe('Car', () => {
        it('can park', () => {
            assert.equal(car.park(), 'stopped');
        });

        it('can drive', () => {
            assert.equal(car.drive(), 'vroom');
        });
    });
```
To use `beforeEach` function you need only single argument which is a lambda function that will be called before each test execution. Sadly, this example is based on global variable. TODO: can it be sth more elegant?

## Running a test

To run test in Mocha you need to add a script to `package.json` file. In the file you should've already preset following, automatically generated code:
```json
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    }
```
Replace value of a `test` argument to `"mocha"` like this:
```json
    "scripts": {
        "test": "mocha"
    }
```
To run the test type into terminal
```sh
npm run test
```

## Promises

All functions from web3 are async so return promise, it means that we need to do sth with it.
```js
    web3.eth.getAccounts()
        .then(fetchedAccounts => {
            console.log(fetchedAccounts);
        });
```

We would like t improve above with sthing more elegant that looks more like synch structure, so we could specify `then` part in later in context-specified manner. Taking as an example `beforeEach` statement consider

```js
let accounts;
...
beforeEach(async() => {
    accounts = await web3.eth.getAccounts();
}
...
describe('Inbox', () => {
    it('deploys a contact', () => {
        console.log(accounts);
    });
});
```
Now we improved the code in the following way:

* we can store result of a promise like a variable using `await`
* the callable that uses `await` need to be defined as `asynch`
* we can manipulate `accounts` dependently on a context

## Problems solved

1) `Error: error:0308010C:digital envelope routines::unsupported`

   This problem in general seems to be caused by newer version of Node.js (seemingly v17+) that is using out-of-date version of openssl. There are two solutions to it (couldn't find anything about upgrading openssl):

   * downgrade Node.js to v16 - `nvm install 16.13.0` (put your required version here)
   * set variable `export NODE_OPTIONS=--openssl-legacy-provider`

