import {type Token, TokenFactory, TokenType} from './utils.js'

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
}
