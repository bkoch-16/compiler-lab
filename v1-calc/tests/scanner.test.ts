import {describe, expect, it} from 'vitest'
import {type Token, TokenType} from '../utils.js'
import {Scanner} from '../scanner.js'

describe('Scanner Class', () => {
    it('should parse number, addition, power', () => {
        const scanner = new Scanner();

        const input: string = "32 + 5^2";
        const output: Token[] = scanner.scanEquation(input);

        expect(output).toEqual([
            {type: TokenType.NUMBER, char: '32'},
            {type: TokenType.ADD, char: '+'},
            {type: TokenType.NUMBER, char: '5'},
            {type: TokenType.POWER, char: '^'},
            {type: TokenType.NUMBER, char: '2'},
            {type: TokenType.EOF, char: ''}
        ])
    })

    it('should parse parenthesis, number, subtraction, division', () => {
        const scanner = new Scanner();

        const input: string = "(10-4)/2";
        const output: Token[] = scanner.scanEquation(input);

        expect(output).toEqual(
            [
                { type: 'OPENPAR', char: '(' },
                { type: 'NUMBER', char: '10' },
                { type: 'SUBTRACT', char: '-' },
                { type: 'NUMBER', char: '4' },
                { type: 'CLOSEPAR', char: ')' },
                { type: 'DIVIDE', char: '/' },
                { type: 'NUMBER', char: '2' },
                { type: 'EOF', char: '' }
            ]
        )
    })

    it('should throw', () => {
        const scanner = new Scanner();

        const input: string = "$5";

        expect(() => scanner.scanEquation(input)).toThrowError("Unknown token: $")
    })
})