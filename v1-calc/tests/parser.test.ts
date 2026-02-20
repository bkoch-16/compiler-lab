import {describe, expect, it} from 'vitest'
import {type ASTNode, type Token, TokenType} from '../utils.js'
import {Scanner} from '../scanner.js'
import {Parser} from '../parser.js'

describe('Parser Class', () => {
    it('Construct AST with addition and power', () => {
        const scanner = new Scanner();

        const raw: string = "32 + 5^2";
        const tokens: Token[] = scanner.scanEquation(raw);

        const parser = new Parser(tokens);

        expect(parser.start()).toEqual({
            kind: 'BINARYEXPRESSION',
            value: '+',
            left: { kind: 'LITERAL', value: '32' },
            right: {
                kind: 'BINARYEXPRESSION',
                value: '^',
                left: { kind: 'LITERAL', value: '5' },
                right: { kind: 'LITERAL', value: '2' }
            }
        })
    })

    it('Construct AST with subtraction, parenthesis, and division ', () => {
        const scanner = new Scanner();

        const raw: string = "2 - (10-4)/2";
        const tokens: Token[] = scanner.scanEquation(raw);

        const parser = new Parser(tokens);

        expect(parser.start()).toEqual({
                kind: "BINARYEXPRESSION",
                value: "-",
                left: {
                    kind: "LITERAL",
                    value: "2"
                },
                right: {
                    kind: "BINARYEXPRESSION",
                    value: "/",
                    left: {
                        kind: "BINARYEXPRESSION",
                        value: "-",
                        left: { "kind": "LITERAL", "value": "10" },
                        right: { "kind": "LITERAL", "value": "4" }
                    },
                    right: {
                        kind: "LITERAL",
                        value: "2"
                    }
                }
        })
    })

    it('Throw an error for unexpected closing character', () => {
        const scanner = new Scanner();

        const raw: string = "2 - (10-4))/2";
        const tokens: Token[] = scanner.scanEquation(raw);

        const parser = new Parser(tokens);

        expect(() => parser.start()).toThrowError('Unexpected token at the end of expression: )')
    })

    it('Throw an error for unexpected closing character', () => {
        const scanner = new Scanner();

        const raw: string = "2 - (10-4/2";
        const tokens: Token[] = scanner.scanEquation(raw);

        const parser = new Parser(tokens);

        expect(() => parser.start()).toThrowError('Missing closing parenthesis')
    })

    it('Throw an error for unexpected symbol arrangement', () => {
        const scanner = new Scanner();

        const raw: string = "2 ++ 4";
        const tokens: Token[] = scanner.scanEquation(raw);

        const parser = new Parser(tokens);

        expect(() => parser.start()).toThrowError('Unexpected token found: ADD')
    })
})