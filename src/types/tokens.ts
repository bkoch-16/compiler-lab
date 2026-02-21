export type BinaryOperators = '+' | '-' | '*' | '/' | '^';
export type UnaryOperators = '+' | '-';

export enum TokenType {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
  MULTIPLY = 'MULTIPLY',
  DIVIDE = 'DIVIDE',
  POWER = 'POWER',
  OPENPAR = 'OPENPAR',
  CLOSEPAR = 'CLOSEPAR',
  NUMBER = 'NUMBER',
  EOF = 'EOF', // End of file
}

export type Token =
    | { type: TokenType.ADD; text: '+' }
    | { type: TokenType.SUBTRACT; text: '-' }
    | { type: TokenType.MULTIPLY; text: '*' }
    | { type: TokenType.DIVIDE; text: '/' }
    | { type: TokenType.POWER; text: '^' }
    | { type: TokenType.OPENPAR; text: '(' }
    | { type: TokenType.CLOSEPAR; text: ')' }
    | { type: TokenType.NUMBER; text: string }
    | { type: TokenType.EOF; text: '' };

export const TokenFactory = {
  create<T extends TokenType>(type: T, text: Extract<Token, { type: T }>['text']): Extract<Token, { type: T }> {
    return { type, text } as Extract<Token, { type: T }>;
  },
};
