import {
  ASTNode,
  ASTNodeFactory,
  type Token,
  TokenType,
} from './types/index.js';

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
      return currentValue;
    } else {
      throw new Error(
        'Unexpected end of input: Token array format is unexpected',
      );
    }
  }

  consume(): Token {
    const currentValue = this.peek();
    this.currentIndex++;
    return currentValue;
  }

  isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  start(): ASTNode {
    const root: ASTNode = this.parseExpression();
    if (process.env.DEBUG) {
        console.dir(root.toJson(), { depth: null, colors: true });
    }
    if (!this.isAtEnd()) {
      throw new Error(
        `Unexpected token at the end of expression: ${this.peek().text}`,
      );
    }

    return root;
  }

  parseExpression(): ASTNode {
    let left: ASTNode = this.parseTerm();
    while (
      this.peek().type === TokenType.ADD ||
      this.peek().type === TokenType.SUBTRACT
    ) {
      const token = this.consume();
      const right: ASTNode = this.parseTerm();
      if (token.type === TokenType.ADD || token.type === TokenType.SUBTRACT) {
        left = ASTNodeFactory.createBinary(token.text, left, right);
      }
    }

    return left;
  }

  parseTerm(): ASTNode {
    let left: ASTNode = this.parseUnary();
    while (
      this.peek().type === TokenType.MULTIPLY ||
      this.peek().type === TokenType.DIVIDE
    ) {
      const token = this.consume();
      const right: ASTNode = this.parseUnary();
      if (token.type === TokenType.MULTIPLY || token.type === TokenType.DIVIDE) {
        left = ASTNodeFactory.createBinary(token.text, left, right);
      }
    }
    return left;
  }

  parseUnary(): ASTNode {
    if (
        this.peek().type === TokenType.ADD ||
        this.peek().type === TokenType.SUBTRACT
    ) {
      const token = this.consume();
      if (token.type === TokenType.ADD || token.type === TokenType.SUBTRACT) {
        return ASTNodeFactory.createUnary(token.text, this.parseUnary());
      }
    }
    return this.parsePower();
  }

  parsePower(): ASTNode {
    const left: ASTNode = this.parsePrimary();
    if (this.peek().type === TokenType.POWER) {
      const token = this.consume();
      if (token.type === TokenType.POWER) {
        return ASTNodeFactory.createBinary(token.text, left, this.parsePower());
      }
    }
    return left;
  }

  parsePrimary(): ASTNode {
    if (this.peek().type === TokenType.OPENPAR) {
      // Remove open par
      this.consume();

      // Evaluate inside of parenthesis
      const expression: ASTNode = this.parseExpression();

      if (this.peek().type === TokenType.CLOSEPAR) {
        this.consume();
      } else {
        throw new Error('Missing closing parenthesis');
      }

      return expression;
    }

    return this.parseNumber();
  }

  parseNumber(): ASTNode {
    if (this.peek().type === TokenType.NUMBER) {
      const token: Token = this.consume();
      return ASTNodeFactory.createLiteral(token.text);
    } else {
      throw new Error(
        `Unexpected token found: ${this.peek().type} ${this.currentIndex}`,
      );
    }
  }
}
