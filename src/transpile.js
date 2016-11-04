const COMMANDS = '><+-.,[]';
const BTM = {};
const MTB = {};

Array.from(COMMANDS).forEach((command, index) => {
  let moo = '';
  for (let i = 0; i < 3; ++i)
    moo += 'moo' + ((index >> i & 1) ? '\r\n' : '\n');
  BTM[command] = moo;
  MTB[moo] = command;
});

module.exports = {
  brainfuckToMoofuck(brainfuck) {
    let moofuck = '';
    for (let command of brainfuck) {
      let moo = BTM[command];
      if (moo)
        moofuck += moo;
    }
    return moofuck;
  },

  moofuckToBrainfuck(moofuck) {
    moofuck = moofuck.match(/^moo\r?\n/gm);
    if (!moofuck)
      return '';

    let brainfuck = '';
    let codon = '';
    let pointer = 0;

    for (let moo of moofuck) {
      codon += moo;
      ++pointer;
      if (pointer === 3) {
        brainfuck += MTB[codon];
        codon = '';
        pointer = 0;
      }
    }

    return brainfuck;
  }
};
