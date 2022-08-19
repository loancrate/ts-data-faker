#!/usr/bin/env node

import { parse } from "ts-command-line-args";
import { Arguments, main } from "./main.js";

await main(
  parse<Arguments>(
    {
      sourceFile: { type: String, alias: "f", description: "Typescript source file" },
      interface: { type: String, alias: "i", description: "Typescript interface to generate from" },
      optionalRatio: { type: Number, alias: "r", description: "Optional property ratio (0 to 1)", defaultValue: 1 },
      outputFile: { type: String, alias: "o", optional: true, description: "Output file (defaults to stdout)" },
      help: { type: Boolean, optional: true, alias: "h", description: "Prints this usage guide" },
    },
    { helpArg: "help" }
  )
);
