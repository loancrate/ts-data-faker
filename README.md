# Typescript Data Faker

This program generates mock data corresponding to a Typescript interface using [Faker](https://fakerjs.dev/).

## Installation

```
npm install
npm link
```

## Running

```
$ ts-data-faker -h

Options

  -f, --sourceFile string      Typescript source file
  -i, --interface string       Typescript interface to generate from
  -r, --optionalRatio number   Optional property ratio (0 to 1)
  -o, --outputFile string      Output file (defaults to stdout)
  -h, --help                   Prints this usage guide

$ ts-data-faker -f test-data/test.ts -i Profile -o test.json
Warning: Unhandled type unknown for alwaysUnknown
Warning: Unhandled FunctionType declaration for fn
Output written to test.json
```

## License

`ts-data-faker` is available under the [ISC license](LICENSE).
