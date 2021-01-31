# wellspring-private

This is a small POC for playing around with some ideas I had for creating a hex map and running a sim on it.

If this ever turns into anything, it'll be re-initialized as a public or other repo.

## setup

0. clone this repo to your local
1. get `npm` and `node.js`: https://www.npmjs.com/get-npm
2. `$ npm install`

## run

0. dick around with `index.js`, right now it's just a dumb wrapper to invoke the map constructor
1. `$ npm run-script start` --or-- `$ node ./src/index.js`

## test

### all the things
`$ npm run-script test`

### some of the things
`$ npm run-script test -- -t 'testNameRegex'` e.g. `$ npm run-script test -- -t 'neighbor'`
