const moofuckToBrainfuck = require('./transpile').moofuckToBrainfuck;
const isArray = Array.isArray;

function parse(brainfuck, _inLoop) {
  brainfuck = brainfuck.split('');
  const node = [];

  let command;
  while (command = brainfuck.shift()) {
    if (command === '[')                  // Push next array of chunks
      node.push(parse(brainfuck, true));
    else if (command === ']' && !_inLoop) // Opening `[` not found
      throw new Error('moo');
    else if (command === ']' && _inLoop)  // Closing `]` found
      return node;
    else                                  // Push command
      node.push(command);
  }

  if (_inLoop)                            // Closing `]` not found
    throw new Error('moo');

  return node;
}

function run(baseNode, input) {
  input = input ? input.split('') : [];
  const array = [];
  let pointer = 0;

  (function _run(node) {
    for (const command of node) {
      if (isArray(command))
        while (array[pointer])
          _run(command);
      else switch (command) {
        case '>': ++pointer;                                break;
        case '<': pointer = pointer ? pointer-1 : 0;        break;
        case '+': array[pointer] = (array[pointer] || 0)+1; break;
        case '-': array[pointer] = (array[pointer] || 0)-1; break;
        case '.':
          process.stdout.write(String.fromCharCode(array[pointer] || 0));
          break;
        case ',': {
          const character = input.shift();
          array[pointer] = character ? character.charCodeAt(0) : 0;
          break;
        }
      }
    }
  })(baseNode);
}

module.exports = function execute(moofuck, input) {
  const brainfuck = moofuckToBrainfuck(moofuck);
  const brainfuckNode = parse(brainfuck);
  run(brainfuckNode, input);
};
