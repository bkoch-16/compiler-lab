import {describe, expect, it} from 'vitest'
import {type ASTNode, type Token, TokenType} from '../utils.js'
import {Scanner} from '../scanner.js'
import {Parser} from '../parser.js'

describe('Scanner Class', () => {
    it('Construct AST with addition and power', () => {
        const scanner = new Scanner();

        const raw: string = "32 + 5^2";
        const tokens: Token[] = scanner.scanEquation(raw);

        const parser = new Parser(tokens);

        expect(parser.parseExpression()).toEqual({
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

        expect(parser.parseExpression()).toEqual({
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
})