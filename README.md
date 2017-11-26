# moofuck

A moo-flavored version of [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck).

### Syntax

Each line must contain only `moo` and end in either `LF` or `CRLF`. Anything else is ignored. The 8 possible 3-permutations of `LF`/`CRLF` endings are mapped to the 8 commands as specified:

 Brainfuck |     Moofuck
:---------:|:----------------:
 `>`       | `LF LF LF`
 `<`       | `LF LF CRLF`
 `+`       | `LF CRLF LF`
 `-`       | `LF CRLF CRLF`
 `.`       | `CRLF LF LF`
 `,`       | `CRLF LF CRLF`
 `[`       | `CRLF CRLF LF`
 `]`       | `CRLF CRLF CRLF`

### Errors

All errors are thrown as `new Error('moo')`.

### Usage

Install with `npm install moofuck --global`.

```
Usage

  moofuck [filename]           Execute a Moofuck program
  moofuck [filename] [input]   ...with an input string

Examples

  moofuck examples/helloWorld.moofuck
  moofuck examples/cat.moofuck "Hello World!"
```

### Examples

See [/examples](examples/) for sample Moofuck programs.
