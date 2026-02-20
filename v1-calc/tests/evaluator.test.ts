import {describe, expect, it} from 'vitest'
import {type ASTNode, type Token, TokenType} from '../utils.js'
import {Scanner} from '../scanner.js'
import {Parser} from '../parser.js'

describe('Evaluator Class', () => {
    it('Evaluate AST with addition and power', () => {
        const scanner = new Scanner();

        const raw: string = "32 + 5^2";
        const tokens: Token[] = scanner.scanEquation(raw);

        const parser = new Parser(tokens);

        const astTree: ASTNode = parser.start();

        const evaluator = new Evaluator(astTree);
        expect(evaluator.start()).toBe(57);
    })
})