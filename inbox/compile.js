const path = require(`path`);
const fs = require('fs');
const solc = require('solc');
const { isTypedArray } = require('util/types');
const { assert } = require('console');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Inbox'];

