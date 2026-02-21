import { type Token, TokenFactory, TokenType } from './utils.js';

export class Scanner {
  makeToken(chunk: string): Token {
    let tokenType: TokenType;

    const numRegex: RegExp = /\d+/;
    switch (chunk) {
      case '+':
        tokenType = TokenType.ADD;
        break;
      case '-':
        tokenType = TokenType.SUBTRACT;
        break;
      case '*':
        tokenType = TokenType.MULTIPLY;
        break;
      case '/':
        tokenType = TokenType.DIVIDE;
        break;
      case '^':
        tokenType = TokenType.POWER;
        break;
      case '(':
        tokenType = TokenType.OPENPAR;
        break;
      case ')':
        tokenType = TokenType.CLOSEPAR;
        break;
      case '':
        tokenType = TokenType.EOF;
        break;
      default:
        if (numRegex.test(chunk)) {
          tokenType = TokenType.NUMBER;
          break;
        }
        if (chunk.includes('.')) {
          throw new Error('Floating point numbers are not supported');
        }
        throw new Error(`Unknown token: ${chunk}`);
    }
    return TokenFactory.create(tokenType, chunk);
  }

  scanEquation(equation: string): Token[] {
    const tokenList: Token[] = [];
    const charNumRegex: RegExp = /\d/;
    const consecNumRegex: RegExp = /\d+/;

    if (equation) {
      // Remove all white space
      const validatedEqn: string = equation.replace(/\s/g, '');

      for (let i: number = 0; i < validatedEqn.length; i++) {
        const currentValue = validatedEqn[i];
        if (currentValue !== undefined) {
          if (charNumRegex.test(currentValue)) {
            // Numeric character
            // Slice the string so we can match with regex to find the length of the number

            const numberSearch: string = validatedEqn.slice(i);
            const checkNumLength = numberSearch.match(consecNumRegex);
            if (checkNumLength) {
              const numLength: number = checkNumLength[0].length;
              const extractNumber: string = checkNumLength[0];
              tokenList.push(this.makeToken(extractNumber));
              i += numLength - 1;
            }
          } else {
            // Operation character (non-numeric)

            tokenList.push(this.makeToken(currentValue));
          }
        }
      }
    }
    tokenList.push(this.makeToken(''));
    return tokenList;
  }
}
