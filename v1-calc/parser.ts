import {ASTNode, ASTNodeFactory, type Token, TokenType} from './utils.js'

export class Parser {
    currentIndex: number;
    tokens: Token[];

    constructor(tokens: Token[]) {
        this.currentIndex = 0;
        this.tokens = tokens;
    }

    peek(): Token {
        const currentValue = this.tokens[this.currentIndex];
        if (currentValue) {
            return currentValue
        } else {
            throw new Error("Unexpected end of input: Token array format is unexpected");
        }
    }

    consume(): Token {
        const currentValue = this.peek()
        this.currentIndex++
        return currentValue;
    }

    isAtEnd(): boolean {
        return (this.peek().type === TokenType.EOF)
    }

    start(): ASTNode {
        const root: ASTNode = this.parseExpression();

        if (!this.isAtEnd()) {
            throw new Error(`Unexpected token at the end of expression: ${this.peek().char}`);
        }

        return root;
    }

    parseExpression(): ASTNode {
        let left: ASTNode = this.parseTerm();
        while (this.peek().type === TokenType.ADD || this.peek().type === TokenType.SUBTRACT) {
            let token: Token = this.consume()
            let right: ASTNode = this.parseTerm();
            left = ASTNodeFactory.createBinary(token.char, left, right)
        }

        return left;
    }

    parseTerm(): ASTNode {
        let left: ASTNode = this.parsePower();
        while (this.peek().type === TokenType.MULTIPLY || this.peek().type === TokenType.DIVIDE) {
            let token: Token = this.consume()
            let right: ASTNode = this.parsePower();
            left = ASTNodeFactory.createBinary(token.char, left, right)
        }
        return left;
    }

    parsePower(): ASTNode {
        let left: ASTNode = this.parsePrimary();
        if (this.peek().type === TokenType.POWER) {
            let token: Token = this.consume()
            return ASTNodeFactory.createBinary(token.char, left, this.parsePower())
        }
        return left;
    }

    parsePrimary(): ASTNode {

        if (this.peek().type === TokenType.OPENPAR) {
            // Remove open par
            let token: Token = this.consume()

            // Evaluate inside of parenthesis
            let expression: ASTNode = this.parseExpression();

            if (this.peek().type === TokenType.CLOSEPAR) {
                this.consume()
            } else {
                throw new Error('Missing closing parenthesis')
            }

            return expression;
        }

        return this.parseNumber();
    }


    parseNumber(): ASTNode {
        if (this.peek().type === TokenType.NUMBER) {
            const token: Token = this.consume();
            return ASTNodeFactory.createLiteral(token.char)
        } else {
            throw new Error (`Unexpected token found: ${this.peek().type}`)
        }
    }
}

