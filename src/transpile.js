const COMMANDS = '><+-.,[]'.split('')
const BTM = {}
const MTB = {}

COMMANDS.forEach((command, index) => {
  let moo = ''
  for (let i = 0; i < 3; ++i) {
    moo += 'moo' + ((index >> i & 1) ? '\r\n' : '\n')
  }
  BTM[command] = moo
  MTB[moo] = command
})

function brainfuckToMoofuck (brainfuck) {
  let moofuck = ''

  for (const command of brainfuck) {
    const moo = BTM[command]
    if (moo) {
      moofuck += moo
    }
  }

  return moofuck
}

function moofuckToBrainfuck (moofuck) {
  moofuck = moofuck.match(/^moo\r?\n/gm)
  if (!moofuck) {
    return ''
  }

  let brainfuck = ''
  let codon = ''
  let pointer = 0

  for (const moo of moofuck) {
    codon += moo
    ++pointer
    if (pointer === 3) {
      brainfuck += MTB[codon]
      codon = ''
      pointer = 0
    }
  }

  return brainfuck
}

module.exports = {
  brainfuckToMoofuck,
  moofuckToBrainfuck
}
