import { describe, expect, it } from 'vitest';
import { type Token, TokenType } from '../src/utils.js';
import { Scanner } from '../src/scanner.js';

describe('Scanner Class', () => {
  it('should parse number, addition, power', () => {
    const scanner = new Scanner();

    const input: string = '32 + 5^2';
    const output: Token[] = scanner.scanEquation(input);

    expect(output).toEqual([
      { type: TokenType.NUMBER, text: '32' },
      { type: TokenType.ADD, text: '+' },
      { type: TokenType.NUMBER, text: '5' },
      { type: TokenType.POWER, text: '^' },
      { type: TokenType.NUMBER, text: '2' },
      { type: TokenType.EOF, text: '' },
    ]);
  });

  it('should parse parenthesis, number, subtraction, division', () => {
    const scanner = new Scanner();

    const input: string = '(10-4)/2';
    const output: Token[] = scanner.scanEquation(input);

    expect(output).toEqual([
      { type: 'OPENPAR', text: '(' },
      { type: 'NUMBER', text: '10' },
      { type: 'SUBTRACT', text: '-' },
      { type: 'NUMBER', text: '4' },
      { type: 'CLOSEPAR', text: ')' },
      { type: 'DIVIDE', text: '/' },
      { type: 'NUMBER', text: '2' },
      { type: 'EOF', text: '' },
    ]);
  });

  it('should throw', () => {
    const scanner = new Scanner();

    const input: string = '$5';

    expect(() => scanner.scanEquation(input)).toThrowError('Unknown token: $');
  });

  it('should return EOF', () => {
    const scanner = new Scanner();

    const input: string = '';

    expect(scanner.scanEquation(input)).toEqual([{ type: 'EOF', text: '' }]);
  });
});
