const { moofuckToBrainfuck } = require('./transpile')

function parse (brainfuck, _inLoop) {
  const node = []

  let command
  while ((command = brainfuck.shift())) {
    if (command === '[') {                    // Push next array of chunks
      node.push(parse(brainfuck, true))
    } else if (command === ']' && !_inLoop) { // Opening `[` not found
      throw new Error('moo')
    } else if (command === ']' && _inLoop) {  // Closing `]` found
      return node
    } else {                                  // Push command
      node.push(command)
    }
  }

  if (_inLoop) {                              // Closing `]` not found
    throw new Error('moo')
  }

  return node
}

function run (baseNode, input, stdout) {
  input = input ? input.split('') : []
  const array = []
  let pointer = 0

  function _run (node) {
    for (const command of node) {
      if (Array.isArray(command)) {
        while (array[pointer]) {
          _run(command)
        }
      } else {
        switch (command) {
          case '>':
            ++pointer
            break
          case '<':
            pointer = pointer ? pointer - 1 : 0
            break
          case '+':
            array[pointer] = (array[pointer] || 0) + 1
            break
          case '-':
            array[pointer] = (array[pointer] || 0) - 1
            break
          case '.':
            stdout.write(String.fromCharCode(array[pointer] || 0))
            break
          case ',': {
            const character = input.shift()
            array[pointer] = character ? character.charCodeAt(0) : 0
            break
          }
        }
      }
    }
  }
  _run(baseNode)
}

function execute (moofuck, input, stdout = process.stdout) {
  const brainfuck = moofuckToBrainfuck(moofuck)
  const brainfuckNode = parse(brainfuck.split(''))
  run(brainfuckNode, input, stdout)
}

module.exports = execute
