import { Scanner } from './scanner.js';
import { Parser } from './parser.js';

const input = process.argv[2];
if (!input) {
    console.log('Usage: npx tsx src/main.ts "<expression>"');
    console.log('Example: npx tsx src/main.ts "3 + 5 * 2"');
    process.exit(1);
}

const scanner = new Scanner();
const tokens = scanner.scanEquation(input);
const parser = new Parser(tokens);
const tree = parser.start();
console.log(tree.calculate());