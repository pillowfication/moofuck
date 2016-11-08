#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const package = require('../package.json');
const execute = require('../src/execute');

// Parse args
const args = {_: []};
for (let i = 2; i < process.argv.length; ++i) {
  const curr = process.argv[i];
  const next = process.argv[i+1];
  args._.push(curr);
  if (curr.indexOf('-') === 0)
    args[curr.replace(/^-+/, '')] =
      (next && next.indexOf('-') !== 0) ? next : true;
}

if (args.h || args.help)
  return fs.createReadStream(path.join(__dirname, 'help.txt'))
    .pipe(process.stdout)
    .on('close', () => { process.exit(1); });

if (args.v || args.version)
  return process.stdout.write(`v${package.version}\n`);

const fileName = args._[0];
const input = args._[1];
let moofuck;

try {
  moofuck = fs.readFileSync(fileName).toString();
} catch (error) {
  throw new Error('moo');
}

execute(moofuck, input);
