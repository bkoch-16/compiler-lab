import { describe, expect, it } from 'vitest';
import { type ASTNode, type Token } from '../src/utils.js';
import { Scanner } from '../src/scanner.js';
import { Parser } from '../src/parser.js';

describe('Parser Class', () => {
  it('Construct and calculate AST with addition and power', () => {
    const scanner = new Scanner();

    const raw: string = '32 + 5^2';
    const tokens: Token[] = scanner.scanEquation(raw);

    const parser = new Parser(tokens);

    const tree: ASTNode = parser.start();
    expect(tree).toEqual({
      kind: 'BINARYEXPRESSION',
      value: '+',
      left: { kind: 'LITERAL', value: '32' },
      right: {
        kind: 'BINARYEXPRESSION',
        value: '^',
        left: { kind: 'LITERAL', value: '5' },
        right: { kind: 'LITERAL', value: '2' },
      },
    });

    const result: number = tree.calculate();
    expect(result).toBe(57);
  });

  it('Construct and calculate AST with subtraction, parenthesis, and division ', () => {
    const scanner = new Scanner();

    const raw: string = '2 - (10-4)/2';
    const tokens: Token[] = scanner.scanEquation(raw);

    const parser = new Parser(tokens);
    const tree: ASTNode = parser.start();

    expect(tree).toEqual({
      kind: 'BINARYEXPRESSION',
      value: '-',
      left: {
        kind: 'LITERAL',
        value: '2',
      },
      right: {
        kind: 'BINARYEXPRESSION',
        value: '/',
        left: {
          kind: 'BINARYEXPRESSION',
          value: '-',
          left: { kind: 'LITERAL', value: '10' },
          right: { kind: 'LITERAL', value: '4' },
        },
        right: {
          kind: 'LITERAL',
          value: '2',
        },
      },
    });

    const result: number = tree.calculate();
    expect(result).toBe(-1);
  });

  it('Throw an error for unexpected closing character', () => {
    const scanner = new Scanner();

    const raw: string = '2 - (10-4))/2';
    const tokens: Token[] = scanner.scanEquation(raw);

    const parser = new Parser(tokens);

    expect(() => parser.start()).toThrowError(
      'Unexpected token at the end of expression: )',
    );
  });

  it('Throw an error for missing closing parenthesis', () => {
    const scanner = new Scanner();

    const raw: string = '2 - (10-4/2';
    const tokens: Token[] = scanner.scanEquation(raw);

    const parser = new Parser(tokens);

    expect(() => parser.start()).toThrowError('Missing closing parenthesis');
  });

  it('Throw an error for unexpected symbol arrangement', () => {
    const scanner = new Scanner();

    const raw: string = '2 +* 4';
    const tokens: Token[] = scanner.scanEquation(raw);

    const parser = new Parser(tokens);

    expect(() => parser.start()).toThrowError(
      'Unexpected token found: MULTIPLY',
    );
  });

  it('Solve a large equation', () => {
    const scanner = new Scanner();

    const raw: string = '3 +5*(3*2-3)^3*3';
    const tokens: Token[] = scanner.scanEquation(raw);
    const parser = new Parser(tokens);

    const tree: ASTNode = parser.start();

    const result: number = tree.calculate();
    expect(result).toBe(408);
  });

  it('Handle unary operators', () => {
    const scanner = new Scanner();

    const raw: string = '-2 + 1';
    const tokens: Token[] = scanner.scanEquation(raw);

    const parser = new Parser(tokens);

    const tree: ASTNode = parser.start();

    const result: number = tree.calculate();
    expect(result).toBe(-1);
  });

  it('Handle unary precedence', () => {
    const scanner = new Scanner();

    const raw: string = '-2^2';
    const tokens: Token[] = scanner.scanEquation(raw);

    const parser = new Parser(tokens);

    const tree: ASTNode = parser.start();

    const result: number = tree.calculate();
    expect(result).toBe(4);
  });
});
